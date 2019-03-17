<template>
    <div>
      <!--查询表单-->
      <el-form :model="params">
        <el-select v-model="params.siteId" placeholder="请选择站点">
          <el-option v-for="item in siteList" :key="item.siteId" :label="item.siteName" :value="item.siteId"></el-option>
        </el-select>
        页面别名：<el-input v-model="params.pageAliase" style="width: 100px;"></el-input>
        <el-button type="primary" @click="query" size="small">查询</el-button>
        <router-link :to="{path:'/cms/page/add',query:{
          page:this.params.page,
          siteId:this.params.siteId,
          pageAliase:this.params.pageAliase
        }}">
          <el-button type="primary" @click="query" size="small">新增</el-button>
        </router-link>
      </el-form>
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="pageName" label="页面名称" width="120" ></el-table-column>
        <el-table-column prop="pageAliase" label="页面别名" width="120" ></el-table-column>
        <el-table-column prop="pageType" label="页面类型" width="150" ></el-table-column>
        <el-table-column prop="pageWebPath" label="访问路径" width="250" ></el-table-column>
        <el-table-column prop="pagePhysicalPath" label="物理路径" width="250" ></el-table-column>
        <el-table-column prop="pageCreateTime" label="创建时间" width="180"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="edit(scope.row.pageId)">编辑</el-button>
            <el-button size="small" type="text" @click="del(scope.row.pageId)">删除</el-button>
            <el-button size="small" type="text" @click="preview(scope.row.pageId)">页面预览</el-button>
            <el-button size="small" type="text" @click="postPage(scope.row.pageId)">页面发布</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="params.size"
        layout="total, sizes, prev, pager, next"
        :total="total"
        style="float:right">
      </el-pagination>
    </div>
</template>

<script>
  import * as CmsApi from '../api/cms';
  export default {
    data() {
      return {
        siteList:[],//站点列表
        tableData: [],
        total: 0,
        params: {
          page: 1,
          size: 10,
          siteId: '',
          pageAliase: ''
        }
      }
    },
    methods: {
      query: function () {
        CmsApi.page_list(this.params.page,this.params.size,this.params).then((res) => {
          this.tableData = res.queryResult.list;
          this.total = res.queryResult.total;
        })
      },
      handleCurrentChange: function (page) {
        this.params.page = page;
        this.query();
      },
      handleSizeChange: function (size) {
        this.params.size = size;
        this.query();
      },
      edit: function (pageId) {
        this.$router.push({
          path: '/cms/page/edit/' + pageId,
          query: {
            page: this.params.page,
            siteId: this.params.siteId
          }
        })
      },
      del: function (pageId) {
        this.$confirm('确认删除吗？','提示',{}).then(() => {
          CmsApi.page_del(pageId).then(res => {
            if (res.success) {
              this.$message.success('删除成功！');
              this.query();
            }else{
              this.$message.error('删除失败！');
            }
          })
        })
      },
      preview: function (pageId) {
        window.open("http://www.xuecheng.com/cms/preview/" + pageId);
      },
      postPage: function (pageId) {
        this.$confirm('确认发布吗？','提示',{}).then(() => {
          CmsApi.page_post(pageId).then(res => {
            if (res.success) {
              this.$message("发布成功！");
            } else {
              this.$message("发布成功！");
            }
          })
        })
      }
    },
    created(){
      this.params.page = Number.parseInt(this.$route.query.page || 1);
      this.params.siteId = this.$route.query.siteId || '';
      this.params.pageAliase = this.$route.query.pageAliase || '';
    },
    mounted() {
      //当DOM元素渲染完成后执行 query
      this.query();
      //初始化站点列表
      this.siteList = [
        {
          siteId:'5a751fab6abb5044e0d19ea1',
          siteName:'门户主站'
        },
        {
          siteId:'102',
          siteName:'测试站'
        }
      ]
    }
  }
</script>

<style scoped>

</style>
