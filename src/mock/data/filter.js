import Mock from 'mockjs';

const Filters = [];

for (let i = 0; i < 86; i++) {
    Filters.push(Mock.mock({
        ruleId: Mock.Random.guid(),
        ruleName: Mock.Random.cname(),
        ruleIntroduction: 'test'
    }));
}

export {Filters};
