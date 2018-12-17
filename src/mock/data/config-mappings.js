import Mock from 'mockjs';

const ConfigMappings = [];

for (let i = 0; i < 86; i++) {
    ConfigMappings.push(Mock.mock({
        id: i + 1,
        sceneName: Mock.Random.cname(),
        uri: '/v1/test',
        method: 'POST',
        sceneIntroduction: '放大放大放大放大放大放大放大放大放大放大放大放大放大放大放大放大放大放大放大放大',
        filters: [
            {
                filterId: i + 1,
                filterName: '是否登录',
                filterOrder: i + 1,
            },
            {
                filterId: i + 2,
                filterName: '是否登录',
                filterOrder: i + 2,
            }
        ]
    }));
}

export {ConfigMappings};
