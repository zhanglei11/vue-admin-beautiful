import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layouts";

Vue.use(Router);

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
];

/*当settings.js里authentication配置的是intelligence时，views引入交给前端配置*/
export const asyncRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("@/views/index/index"),
        meta: {
          title: "首页",
          icon: "home",
          affix: true,
          noCache: true,
        },
      },
    ],
  },
  {
    path: "/test",
    component: Layout,
    redirect: "noRedirect",
    children: [
      {
        path: "test",
        name: "Test",
        component: () => import("@/views/test/index"),
        meta: { title: "Webstorm最新版激活", icon: "marker" },
      },
    ],
  },
  {
    path: "/permission",
    component: Layout,
    redirect: "noRedirect",
    children: [
      {
        path: "permission",
        name: "Permission",
        component: () => import("@/views/byui/permission/index"),
        meta: { title: "权限控制", icon: "user-shield" },
      },
    ],
  },
  {
    path: "/byui",
    component: Layout,
    redirect: "noRedirect",
    name: "Byui",
    meta: { title: "组件库", icon: "cloud", roles: ["admin"] },
    children: [
      {
        path: "codeGenerator",
        name: "CodeGenerator",
        component: () => import("@/views/byui/codeGenerator/index"),
        meta: { title: "代码生成机" },
      },
      {
        path: "news",
        name: "News",
        component: () => import("@/views/byui/news/index"),
        meta: { title: "新闻" },
      },
      /*{
        path: "markdown",
        name: "Markdown",
        component: () => import("@/views/byui/markdown/index"),
        meta: { title: "markdown阅读器" },
      },*/
      {
        path: "smallComponents",
        name: "SmallComponents",
        component: () => import("@/views/byui/smallComponents/index"),
        meta: { title: "小组件" },
      },
      {
        path: "icon",
        name: "Icon",
        component: () => import("@/views/byui/icon/index"),
        meta: { title: "图标" },
      },
      {
        path: "colorfulIcon",
        name: "ColorfulIcon",
        component: () => import("@/views/byui/icon/colorfulIcon"),
        meta: { title: "多彩图标" },
      },
      {
        path: "upload",
        name: "Upload",
        component: () => import("@/views/byui/upload/index"),
        meta: { title: "上传" },
      },
      {
        path: "webUploader",
        name: "WebUploader",
        component: () => import("@/views/byui/webUploader/index"),
        meta: { title: "webUploader上传" },
      },
      {
        path: "sticky",
        name: "Sticky",
        component: () => import("@/views/byui/sticky/index"),
        meta: { title: "sticky吸附" },
      },
      {
        path: "table",
        name: "Table",
        component: () => import("@/views/byui/table/index"),
        meta: { title: "表格" },
      },
      {
        path: "form",
        name: "Form",
        component: () => import("@/views/byui/form/index"),
        meta: { title: "表单" },
      },
      {
        path: "tree",
        name: "Tree",
        component: () => import("@/views/byui/tree/index"),
        meta: { title: "树" },
      },
      {
        path: "card",
        name: "Card",
        component: () => import("@/views/byui/card/index"),
        meta: { title: "卡片" },
      },
      {
        path: "magnifier",
        name: "Magnifier",
        component: () => import("@/views/byui/magnifier/index"),
        meta: { title: "放大镜" },
      },
      {
        path: "waterfall",
        name: "Waterfall",
        component: () => import("@/views/byui/waterfall/index"),
        meta: { title: "瀑布屏", noCache: true },
      },
      {
        path: "echarts",
        name: "Echarts",
        component: () => import("@/views/byui/echarts/index"),
        meta: { title: "图表" },
      },

      {
        path: "loading",
        name: "Loading",
        component: () => import("@/views/byui/loading/index"),
        meta: { title: "loading" },
      },
      /*{
        path: "player",
        name: "Player",
        component: () => import("@/views/byui/player/index"),
        meta: { title: "视频播放器", noCache: true },
      },*/
      {
        path: "editor",
        name: "Editor",
        component: () => import("@/views/byui/editor/index"),
        meta: { title: "富文本编辑器" },
      },
      {
        path: "qrCode",
        name: "QrCode",
        component: () => import("@/views/byui/qrCode/index"),
        meta: { title: "二维码" },
      },
      {
        path: "backToTop",
        name: "BackToTop",
        component: () => import("@/views/byui/backToTop/index"),
        meta: { title: "返回顶部" },
      },
      {
        path: "lodash",
        name: "Lodash",
        component: () => import("@/views/byui/lodash/index"),
        meta: { title: "lodash" },
      },
      {
        path: "imgComparison",
        name: "ImgComparison",
        component: () => import("@/views/byui/imgComparison/index"),
        meta: { title: "图像拖拽比对" },
      },
      {
        path: "log",
        name: "Log",
        component: () => import("@/views/byui/errorLog/index"),
        meta: { title: "错误日志模拟" },
      },
      {
        path: "more",
        name: "More",
        component: () => import("@/views/byui/more/index"),
        meta: { title: "更多组件" },
      },
    ],
  },
  {
    path: "/401",
    component: () => import("@/views/401"),
    meta: { title: "401错误页演示", icon: "bug" },
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    meta: { title: "404错误页演示", icon: "bug" },
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];
const createRouter = () =>
  new Router({
    mode: "hash",
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  });

const router = createRouter();
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

export default router;
