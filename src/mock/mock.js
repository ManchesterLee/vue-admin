import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {LoginUsers} from './data/user';
import {Filters} from './data/filter';
import {ConfigMappings} from "./data/config-mappings";

let _Filters = Filters;
let _ConfigMappings = ConfigMappings;

export default {
    /**
     * mock bootstrap
     */
    bootstrap() {
        let mock = new MockAdapter(axios);

        // mock success request
        mock.onGet('/success').reply(200, {
            msg: 'success'
        });

        // mock error request
        mock.onGet('/error').reply(500, {
            msg: 'failure'
        });

        //登录
        mock.onPost('/login').reply(config => {
            let {username, password} = JSON.parse(config.data);
            return new Promise((resolve, reject) => {
                let user = null;
                setTimeout(() => {
                    let hasUser = LoginUsers.some(u => {
                        if (u.username === username && u.password === password) {
                            user = JSON.parse(JSON.stringify(u));
                            user.password = undefined;
                            return true;
                        }
                    });

                    if (hasUser) {
                        resolve([200, {code: 200, msg: '请求成功', user}]);
                    } else {
                        resolve([200, {code: 500, msg: '账号或密码错误'}]);
                    }
                }, 1000);
            });
        });

        mock.onGet('/filter/page').reply(config => {
            let mockFilters = _Filters.filter((filter, index) => {
                return index < 10;

            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        rules: mockFilters
                    }]);
                }, 1000);
            });
        });
        mock.onPost('/filter').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {code: 200, msg: '保存成功'}]);
                }, 1000);
            });
        });

        mock.onGet('/config-mappings/page').reply(config => {
            let mockConfigMappings = _ConfigMappings.filter((mapping, index) => {
                return index < 10;
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        configMappings: mockConfigMappings
                    }]);
                }, 1000);
            })
        });
    }
};