import { compileMap, getKey, getCompileList, clearCompileList, compileFakeThead, compileTh, compileTd, compileEmptyTemplate, compileFullColumn, sendCompile } from '@common/framework';
import tableTpl from '@test/table-test.tpl.html';

// 清除空格
const tableTestTpl = tableTpl;
describe('Framework', () => {
    let settings = null;
    let gridManagerName = null;
    beforeEach(() => {
        gridManagerName = 'test';
    });

    afterEach(() => {
        settings = null;
        delete compileMap[gridManagerName];
        gridManagerName = null;
    });

    describe('getKey', () => {
        it('基础验证', () => {
            expect(getKey).toBeDefined();
            expect(getKey.length).toBe(1);
        });
        it('执行验证', () => {
            expect(getKey()).toBe('data-compile-id-');
            expect(getKey(gridManagerName)).toBe('data-compile-id-test');
            expect(getKey('cc')).toBe('data-compile-id-cc');
        });
    });

    describe('getCompileList', () => {
        it('基础验证', () => {
            expect(getCompileList).toBeDefined();
            expect(getCompileList.length).toBe(1);
        });
        it('执行验证', () => {
            expect(getCompileList()).toEqual([]);
            expect(getCompileList(gridManagerName)).toEqual([]);
            compileMap[gridManagerName] = [1, 2];
            expect(getCompileList(gridManagerName)).toEqual([1, 2]);
        });
    });

    describe('clearCompileList', () => {
        it('基础验证', () => {
            expect(clearCompileList).toBeDefined();
            expect(clearCompileList.length).toBe(1);
        });
        it('执行验证', () => {
            expect(compileMap[gridManagerName]).toBeUndefined();
            clearCompileList(gridManagerName);
            expect(compileMap[gridManagerName]).toEqual([]);
        });
    });

    describe('compileFakeThead', () => {
        let fakeTheadTr = null;
        beforeEach(() => {
            document.body.innerHTML = tableTestTpl;
            fakeTheadTr = document.querySelector('thead[grid-manager-mock-thead="test"] tr');
            // 模拟未渲染前效果
            [].forEach.call(fakeTheadTr.querySelectorAll('th[gm-create="false"]'), (item, index) => {
                item.setAttribute('data-compile-id-test', index);
            });
        });

        afterEach(() => {
            document.body.innerHTML = '';
            [].forEach.call(fakeTheadTr.querySelectorAll('th[gm-create="false"]'), item => {
                item.removeAttribute('data-compile-id-test');
            });
            fakeTheadTr = null;
        });
        it('基础验证', () => {
            expect(compileFakeThead).toBeDefined();
            expect(compileFakeThead.length).toBe(2);
        });
        it('无框架', () => {
            settings = {
                gridManagerName
            };
            expect(getCompileList(gridManagerName).length).toBe(0);
            compileFakeThead(settings, fakeTheadTr);
            expect(getCompileList(gridManagerName).length).toBe(0);
        });

        it('Angular-1.x', () => {
            settings = {
                gridManagerName,
                compileAngularjs: jasmine.createSpy('callback')
            };
            expect(getCompileList(gridManagerName).length).toBe(0);
            compileFakeThead(settings, fakeTheadTr);
            expect(getCompileList(gridManagerName).length).toBe(8);
        });

        it('Vue', () => {
            settings = {
                gridManagerName,
                compileVue: jasmine.createSpy('callback')
            };
            expect(getCompileList(gridManagerName).length).toBe(0);
            compileFakeThead(settings, fakeTheadTr);
            expect(getCompileList(gridManagerName).length).toBe(8);
        });

        it('React', () => {
            settings = {
                gridManagerName,
                compileReact: jasmine.createSpy('callback')
            };
            expect(getCompileList(gridManagerName).length).toBe(0);
            compileFakeThead(settings, fakeTheadTr);
            expect(getCompileList(gridManagerName).length).toBe(8);
        });
    });

    describe('compileTh', () => {
        it('基础验证', () => {
            expect(compileTh).toBeDefined();
            expect(compileTh.length).toBe(3);
        });
        it('无框架', () => {
            settings = {
                gridManagerName
            };
            expect(getCompileList(gridManagerName).length).toBe(0);
            expect(compileTh(settings, 'title', () => '标题').text).toBe('标题');
            expect(compileTh(settings, 'title', () => '标题').compileAttr).toBe('');
            expect(getCompileList(gridManagerName).length).toBe(0);

        });
        it('Angular-1.x', () => {
            settings = {
                gridManagerName,
                compileAngularjs: jasmine.createSpy('callback')
            };

            expect(getCompileList(gridManagerName).length).toBe(0);
            let obj = compileTh(settings, 'title', () => '标题');
            expect(obj.text).toBe('标题');
            expect(obj.compileAttr).toBe('data-compile-id-test=0');
            expect(getCompileList(gridManagerName).length).toBe(1);
            obj = null;
        });

        it('Vue', () => {
            settings = {
                gridManagerName,
                compileVue: jasmine.createSpy('callback')
            };

            expect(getCompileList(gridManagerName).length).toBe(0);
            let obj = compileTh(settings, 'title', () => '标题');
            expect(obj.text).toBe('标题');
            expect(obj.compileAttr).toBe('data-compile-id-test=0');
            expect(getCompileList(gridManagerName).length).toBe(1);
            obj = null;
        });

        it('React', () => {
            settings = {
                gridManagerName,
                compileReact: jasmine.createSpy('callback')
            };

            expect(getCompileList(gridManagerName).length).toBe(0);
            let obj = compileTh(settings, 'title', () => '标题');
            expect(obj.text).toBe('');
            expect(obj.compileAttr).toBe('data-compile-id-test=0');
            expect(getCompileList(gridManagerName).length).toBe(1);
            obj = null;
        });
    });

    describe('compileTd', () => {
        let tdNode = null;
        let row = null;
        let tdTemplate = null;
        beforeEach(() => {
            document.body.innerHTML = tableTestTpl;
            // 获取第一个非自动创建td
            tdNode = document.querySelector('tbody tr td[gm-create="false"]');
            row = {
                'id': 92,
                'title': 'Content-Type 对照表',
                'subtitle': 'Content-Type,Mime-Type',
                'pic': '/upload/blog/pic/9081_type.jpg',
                'createDate': 1533263664000,
                'lastDate': 1533276847970,
                'author': '33',
                'type': 3,
                'status': 1,
                'info': 'Content-Type(Mime-Type)对照表, 有不全的会继续更新',
                'readNumber': 331,
                'praiseNumber': '0',
                'commentSum': 0,
                'username': '拭目以待',
                'photo': '/upload/user/photo/8495_1.jpg'
            };
        });

        afterEach(() => {
            document.body.innerHTML = '';
            tdNode = null;
            row = null;
            tdTemplate = null;
        });
        it('基础验证', () => {
            expect(compileTd).toBeDefined();
            expect(compileTd.length).toBe(6);
        });

        it('无框架: 模板为函数', () => {
            settings = {
                gridManagerName
            };
            tdTemplate = () => {
                return 'this is function';
            };
            expect(getCompileList(gridManagerName).length).toBe(0);
            expect(compileTd(settings, tdNode, tdTemplate, row, 1, 'pic')).toBe('this is function');
            expect(getCompileList(gridManagerName).length).toBe(0);
        });

        it('无框架: 模板为空', () => {
            settings = {
                gridManagerName
            };
            expect(getCompileList(gridManagerName).length).toBe(0);
            expect(compileTd(settings, tdNode, tdTemplate, row, 1, 'pic')).toBe('/upload/blog/pic/9081_type.jpg');
            expect(getCompileList(gridManagerName).length).toBe(0);
        });

        it('Angular-1.x: 无模板', () => {
            settings = {
                gridManagerName,
                compileAngularjs: jasmine.createSpy('callback')
            };

            expect(getCompileList(gridManagerName).length).toBe(0);
            expect(compileTd(settings, tdNode, tdTemplate, row, 1, 'pic')).toBe('/upload/blog/pic/9081_type.jpg');
            expect(getCompileList(gridManagerName).length).toBe(0);
        });

        it('Angular-1.x: 有模板', () => {
            settings = {
                gridManagerName,
                compileAngularjs: jasmine.createSpy('callback')
            };

            tdTemplate = (pic, row, index) => {
                return 'this is function' + pic + index;
            };
            expect(getCompileList(gridManagerName).length).toBe(0);
            expect(compileTd(settings, tdNode, tdTemplate, row, 1, 'pic')).toBe('this is function/upload/blog/pic/9081_type.jpg1');
            expect(getCompileList(gridManagerName).length).toBe(1);
        });

        it('Vue: 无模板', () => {
            settings = {
                gridManagerName,
                compileVue: jasmine.createSpy('callback')
            };

            expect(getCompileList(gridManagerName).length).toBe(0);
            expect(compileTd(settings, tdNode, tdTemplate, row, 1, 'pic')).toBe('/upload/blog/pic/9081_type.jpg');
            expect(getCompileList(gridManagerName).length).toBe(0);
        });

        it('Vue: 有模板', () => {
            settings = {
                gridManagerName,
                compileVue: jasmine.createSpy('callback')
            };

            tdTemplate = (pic, row, index) => {
                return 'this is function' + pic + index;
            };
            expect(getCompileList(gridManagerName).length).toBe(0);
            expect(compileTd(settings, tdNode, tdTemplate, row, 1, 'pic')).toBe('this is function/upload/blog/pic/9081_type.jpg1');
            expect(getCompileList(gridManagerName).length).toBe(1);
        });

        it('React: 无模板', () => {
            settings = {
                gridManagerName,
                compileReact: jasmine.createSpy('callback')
            };

            expect(getCompileList(gridManagerName).length).toBe(0);
            expect(compileTd(settings, tdNode, tdTemplate, row, 1, 'pic')).toBe('/upload/blog/pic/9081_type.jpg');
            expect(getCompileList(gridManagerName).length).toBe(0);
        });

        it('React: 有模板', () => {
            settings = {
                gridManagerName,
                compileReact: jasmine.createSpy('callback')
            };

            tdTemplate = () => {
                return 'this is function';
            };
            expect(getCompileList(gridManagerName).length).toBe(0);
            expect(compileTd(settings, tdNode, tdTemplate, row, 1, 'pic')).toBe('');
            expect(getCompileList(gridManagerName).length).toBe(1);
        });
    });

    describe('compileEmptyTemplate', () => {
        let emptyNode = null;
        let template = null;
        beforeEach(() => {
            template = () => '<div>空空的，什么也没有</div>';
            document.body.innerHTML = '<table><tbody><td empty-node></td></tbody></table>';
            emptyNode = document.querySelector('td[empty-node]');
        });
        afterEach(() => {
            document.body.innerHTML = '';
            emptyNode = null;
            template = null;
        });
        it('基础验证', () => {
            expect(compileEmptyTemplate).toBeDefined();
            expect(compileEmptyTemplate.length).toBe(3);
        });

        it('无框架', () => {
            settings = {
                gridManagerName
            };
            expect(getCompileList(gridManagerName).length).toBe(0);
            expect(compileEmptyTemplate(settings, emptyNode, template)).toBe('<div>空空的，什么也没有</div>');
            expect(getCompileList(gridManagerName).length).toBe(0);
        });

        it('Angular-1.x', () => {
            settings = {
                gridManagerName,
                compileAngularjs: jasmine.createSpy('callback')
            };

            expect(getCompileList(gridManagerName).length).toBe(0);
            expect(compileEmptyTemplate(settings, emptyNode, template)).toBe('<div>空空的，什么也没有</div>');
            expect(getCompileList(gridManagerName).length).toBe(1);
        });

        it('Vue', () => {
            settings = {
                gridManagerName,
                compileVue: jasmine.createSpy('callback')
            };

            expect(getCompileList(gridManagerName).length).toBe(0);
            expect(compileEmptyTemplate(settings, emptyNode, template)).toBe('<div>空空的，什么也没有</div>');
            expect(getCompileList(gridManagerName).length).toBe(1);
        });

        it('React', () => {
            settings = {
                gridManagerName,
                compileReact: jasmine.createSpy('callback')
            };

            expect(getCompileList(gridManagerName).length).toBe(0);
            expect(compileEmptyTemplate(settings, emptyNode, template)).toBe('');
            expect(getCompileList(gridManagerName).length).toBe(1);
        });
    });

    describe('compileFullColumn', () => {
        let fullNode = null;
        let row = null;
        let template = null;
        beforeEach(() => {
            document.body.innerHTML = '<table><tbody><tr><td colspan="1"><div class="full-column-td"></div></td></tr></tbody></table>';
            fullNode = document.querySelector('tbody div.full-column-td');
            row = {
                'id': 92,
                'title': 'Content-Type 对照表',
                'subtitle': 'Content-Type,Mime-Type',
                'pic': '/upload/blog/pic/9081_type.jpg',
                'createDate': 1533263664000,
                'lastDate': 1533276847970,
                'author': '33',
                'type': 3,
                'status': 1,
                'info': 'Content-Type(Mime-Type)对照表, 有不全的会继续更新',
                'readNumber': 331,
                'praiseNumber': '0',
                'commentSum': 0,
                'username': '拭目以待',
                'photo': '/upload/user/photo/8495_1.jpg'
            };
        });

        afterEach(() => {
            document.body.innerHTML = '';
            fullNode = null;
            row = null;
            template = null;
        });
        it('基础验证', () => {
            expect(compileFullColumn).toBeDefined();
            expect(compileFullColumn.length).toBe(5);
        });

        it('无框架', () => {
            settings = {
                gridManagerName
            };

            template = () => {
                return '<div>这个是通栏</div>';
            };
            expect(getCompileList(gridManagerName).length).toBe(0);
            expect(compileFullColumn(settings, fullNode, row, 1, template)).toBe('<div>这个是通栏</div>');
            expect(getCompileList(gridManagerName).length).toBe(0);
        });

        it('Angular-1.x', () => {
            settings = {
                gridManagerName,
                compileAngularjs: jasmine.createSpy('callback')
            };

            template = () => {
                return '<div>这个是通栏</div>';
            };
            expect(getCompileList(gridManagerName).length).toBe(0);
            expect(compileFullColumn(settings, fullNode, row, 1, template)).toBe('<div>这个是通栏</div>');
            expect(getCompileList(gridManagerName).length).toBe(1);
        });

        it('Vue', () => {
            settings = {
                gridManagerName,
                compileVue: jasmine.createSpy('callback')
            };

            template = () => {
                return '<div>这个是通栏</div>';
            };
            expect(getCompileList(gridManagerName).length).toBe(0);
            expect(compileFullColumn(settings, fullNode, row, 1, template)).toBe('<div>这个是通栏</div>');
            expect(getCompileList(gridManagerName).length).toBe(1);
        });

        it('React', () => {
            settings = {
                gridManagerName,
                compileReact: jasmine.createSpy('callback')
            };

            template = () => {
                return '<div>这个是通栏</div>';
            };
            expect(getCompileList(gridManagerName).length).toBe(0);
            expect(compileFullColumn(settings, fullNode, row, 1, template)).toBe('');
            expect(getCompileList(gridManagerName).length).toBe(1);
        });
    });


    describe('send', () => {
        beforeEach(() => {
            document.body.innerHTML = '<table><tbody><tr><td data-compile-id-test="1"></td><td data-compile-id-test="2"></td></tr></tbody></table>';
        });

        afterEach(() => {
            document.body.innerHTML = '';
        });
        it('基础验证', () => {
            expect(sendCompile).toBeDefined();
            expect(sendCompile.length).toBe(2);
        });

        it('没有要发送的数据', () => {
            settings = {
                gridManagerName
            };
            sendCompile(settings);
            expect(getCompileList(gridManagerName).length).toBe(0);
        });

        it('通过属性更新element', () => {
            settings = {
                gridManagerName
            };
            compileMap[gridManagerName] = [{template: '测试一下'}, {template: '测试二下'}];
            sendCompile(settings, true);
            expect(getCompileList(gridManagerName).length).toBe(0);
        });

        it('Angular-1.x', () => {
            compileMap[gridManagerName] = [{template: '测试一下', el: document.querySelector('td[data-compile-id-test="1"]')}, {template: '测试二下', el: document.querySelector('td[data-compile-id-test="2"]')}];
            settings = {
                gridManagerName,
                compileAngularjs: jasmine.createSpy('callback')
            };
            expect(getCompileList(gridManagerName).length).toBe(2);
            sendCompile(settings).then(res => {
                expect(settings.compileAngularjs).toHaveBeenCalled();
                expect(getCompileList(gridManagerName).length).toBe(0);
            });
        });

        it('Vue', () => {
            compileMap[gridManagerName] = [{template: '测试一下', el: document.querySelector('td[data-compile-id-test="1"]')}, {template: '测试二下', el: document.querySelector('td[data-compile-id-test="2"]')}];
            settings = {
                gridManagerName,
                compileVue: jasmine.createSpy('callback')
            };
            expect(getCompileList(gridManagerName).length).toBe(2);
            sendCompile(settings).then(res => {
                expect(settings.compileVue).toHaveBeenCalled();
                expect(getCompileList(gridManagerName).length).toBe(0);
            });
        });

        it('React', () => {
            compileMap[gridManagerName] = [{template: '测试一下', el: document.querySelector('td[data-compile-id-test="1"]')}, {template: '测试二下', el: document.querySelector('td[data-compile-id-test="2"]')}];
            settings = {
                gridManagerName,
                compileReact: jasmine.createSpy('callback')
            };
            expect(getCompileList(gridManagerName).length).toBe(2);
            sendCompile(settings).then(res => {
                expect(settings.compileReact).toHaveBeenCalled();
                expect(getCompileList(gridManagerName).length).toBe(0);
            });
        });
    });
});
