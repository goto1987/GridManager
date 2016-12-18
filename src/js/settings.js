/**
 * Settings: 配置项
 */
import $ from './jTool';
const Settings = {
	//版本号
	version: '2.1.0',
	//是否为开发模式，为true时将打印事件日志
	isDevelopMode: false,

	//当前基本路径[用于加载分页所需样式文件]
	basePath: '',

	//是否使用默认的table样式
	useDefaultStyle: true,

	//是否支持拖拽功能
	supportDrag: true,

	//列表内是否存在实时刷新[平时尽量不要设置为true，以免消耗资源]
	isRealTime: false,

	//是否支持宽度调整功能]
	supportAdjust: true,

	//是否支持表头提示信息[需在地应的TH上增加属性remind]
	supportRemind: false,

	//是否支持配置列表功能[操作列是否可见]
	supportConfig: true,

	//是否支持表头置顶
	supportSetTop: true,

	//是否支持表头置顶
	scrollDOM: window,

	//特殊情况下才进行设置，在有悬浮物遮挡住表头置顶区域时进行使用，配置值为遮挡的高度
	topValue: 0,

	//动画效果时长
	animateTime: 300,

	//是否禁用本地缓存
	disableCache: false,

	//是否自动加载CSS文件
	autoLoadCss: false,
	//排序 sort
	supportSorting		: false, 					//排序：是否支持排序功能
	isCombSorting		: false,					//是否为组合排序[只有在支持排序的情况下生效
	sortData 			: {},						//存储排序数据[不对外公开参数]
	sortUpText			: 'up',						//排序：升序标识[该标识将会传至数据接口]
	sortDownText		: 'down',					//排序：降序标识[该标识将会传至数据接口]
	sortingBefore		: $.noop,					//排序事件发生前
	sortingAfter		: $.noop,					//排序事件发生后

	//分页 ajaxPag
	supportAjaxPage	: false,					//是否支持配置列表ajxa分页
	sizeData 			: [10,20,30,50,100], 		//用于配置列表每页展示条数选择框
	pageSize			: 20,						//每页显示条数，如果使用缓存且存在缓存数据，那么该值将失效
	pageData 			: {},						//存储分页数据[不对外公开参数]
	query 				: {},						//其它需要带入的参数，该参数中设置的数据会在分页或排序事件中以参数形式传递
	pagingBefore		: $.noop,					//分页事件发生前
	pagingAfter		: $.noop,					//分页事件发生后
	pageCssFile 		: '',						//分页样式文件路径[用户自定义分页样式]

	//序号
	supportAutoOrder	: true,						//是否支持自动序号
	// baukh20161104:移除 orderThName		: 'order',					//序号列所使用的th-name

	//选择、反选
	supportCheckbox	: true,						//是否支持选择与反选
	// baukh20161104:移除 checkboxThName		: 'gm-checkbox',			//选择与反选列所使用的th-name
	//国际化
	i18n	 			: 'zh-cn',					//选择使用哪种语言，暂时支持[zh-cn:简体中文，en-us:美式英语] 默认zh-cn

	//用于支持通过数据渲染DOM
	columnData			: [],						//表格列数据配置项
	gridManagerName   	: '',						//表格grid-manager所对应的值[可在html中配置]
	ajax_url			: '',						//获取表格数据地址，配置该参数后，将会动态获取数据
	ajax_type			: 'GET',					//ajax请求类型['GET', 'POST']默认GET
	ajax_beforeSend		: $.noop,					//ajax请求之前,与jTool的beforeSend使用方法相同
	ajax_success		: $.noop,					//ajax成功后,与jTool的success使用方法相同
	ajax_complete		: $.noop,					//ajax完成后,与jTool的complete使用方法相同
	ajax_error			: $.noop,					//ajax失败后,与jTool的error使用方法相同
	ajax_data			: undefined,				//ajax静态数据,配置后ajax_url将无效
	dataKey				: 'data',					//ajax请求返回的列表数据key键值,默认为data
	totalsKey			: 'totals',					//ajax请求返回的数据总条数key键值,默认为totals
	//数据导出
	supportExport		: true						//支持导出表格数据
};
export default Settings;