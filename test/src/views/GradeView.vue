<template>
  <div>
    <el-button type="primary" @click="addGrade()"> 添加成绩 </el-button>
    <el-dialog v-model="dialogFormVisible" title="添加成绩">
      <el-form :model="gradesParams" ref="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input
            v-model="gradesParams.name"
            autocomplete="off"
            :disabled="isEidt"
          />
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-select
            v-model="gradesParams.class"
            placeholder="选择班级"
            style="width: 600px"
            :disabled="isEidt"
          >
            <el-option label="2201" value="2201" />
            <el-option label="2201" value="2202" />
            <el-option label="2203" value="2203" />
            <el-option label="2204" value="2204" />
          </el-select>
        </el-form-item>
        <el-form-item label="语文" :label-width="formLabelWidth">
          <el-input v-model="gradesParams.ch" autocomplete="off" />
        </el-form-item>
        <el-form-item label="数学" :label-width="formLabelWidth">
          <el-input v-model="gradesParams.mh" autocomplete="off" />
        </el-form-item>
        <el-form-item label="英语" :label-width="formLabelWidth">
          <el-input v-model="gradesParams.eh" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelHandler()">取消</el-button>
          <el-button type="primary" @click="subGrades()"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>

    <el-form
      :model="listParams"
      label-width="80px"
      :inline="true"
      size="normal"
    >
      <el-form-item label="关键词">
        <!-- 可以使用深拷贝  取消输入立即搜索-->
        <el-input v-model.lazy="wd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchWd()">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%" height="600">
      <el-table-column fixed prop="id" label="编号" width="150" />
      <el-table-column prop="name" label="姓名" width="150" />
      <el-table-column prop="class" label="班级" width="150" />
      <el-table-column prop="chinese" label="语文" width="150">
      </el-table-column>
      <el-table-column prop="math" label="数学" width="150"> </el-table-column>
      <el-table-column prop="english" label="英语" width="150">
      </el-table-column>
      <el-table-column prop="total" label="总分" width="150" />
      <el-table-column prop="" label="操作" width="150">
        <template v-slot="scope">
          <el-button
            type="primary"
            size="default"
            @click="editHandler(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="150">
        <template v-slot="scope">
          <el-button
            type="primary"
            size="default"
            @click="delHandler(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-block">
      <el-pagination
        v-model:current-page="listParams.page"
        v-model:page-size="listParams.size"
        :page-sizes="[10, 20, 30, 50]"
        :small="small"
        :disabled="disabled"
        background
        layout=" sizes, prev, pager, next, jumper,total,slot"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, watchEffect } from "vue";
import {
  updateGradeByIdApi,
  deleteGradeByIdApi,
  searchGradeByIdApi,
  addGradeApi,
  searchGradeOrderLimitApi,
} from "@/api/grade.js";
// 是添加还是修改
const isEidt = ref(false);
const wd = ref(null);
let tableData = ref([]);
let total = ref(null);
let listParams = reactive({
  wd: "",
  col: "id",
  type: "desc",
  page: 1,
  size: 10,
});
const form = ref();
const dialogTableVisible = ref(false);
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
let gradesParams = ref({
  name: "",
  ch: "",
  mh: "",
  eh: "",
});
let searchWd = () => {
  listParams.wd = wd.value;
};
let updateHandler = async () => {
  let res = await updateGradeByIdApi({ ...gradesParams.value });
  dialogFormVisible.value = false;
  console.log(res.meseage);
};
let addGrade = () => {
  dialogTableVisible.value = true;
  dialogFormVisible.value = true;
  isEidt.value = false;
};
let subGrades = async () => {
  try {
    if (isEidt.value) {
      updateHandler();
      searchGradeOrderLimit();
    } else {
      let res = await addGradeApi({ ...gradesParams.value });
      dialogFormVisible.value = false;
      console.log(res.meseage);
      searchGradeOrderLimit();
    }
  } catch (err) {
    console.log(err);
  }
};
let cancelHandler = () => {
  isEidt.value = false;
  dialogFormVisible.value = false;
  gradesParams.value = {};
  form.value.resetFields();
};
// 点击编辑弹出 对话框
let editHandler = async (row) => {
  dialogTableVisible.value = true;
  dialogFormVisible.value = true;
  isEidt.value = true;
  // 将本行的信息放入对话框
  console.log(row);
  gradesParams.value.name = row.name;
  gradesParams.value.class = row.class;
  gradesParams.value.ch = row.chinese;
  gradesParams.value.mh = row.math;
  gradesParams.value.eh = row.english;
  gradesParams.value.id = row.id;
};

let searchGradeOrderLimit = async () => {
  try {
    let res = await searchGradeOrderLimitApi({ ...listParams });
    console.log(res.list);
    res.list.forEach((item) => {
      item.flag = false;
    });
    tableData.value = res.list;
    total.value = res.total;
  } catch (err) {
    console.log(err);
  }
};
let delHandler = (id) => {
  try {
    if (confirm("是否删除")) {
      deleteGradeByIdApi({ id });
      searchGradeOrderLimit();
    }
  } catch (err) {
    console.log(err);
  }
};
let handleCurrentChange = (val) => {
  listParams.page = val;
};
let handleSizeChange = (val) => {
  listParams.size = val;
};
watchEffect(() => {
  searchGradeOrderLimit();
});
</script>
<style scoped>
.pagination-block {
  width: 100%;
  margin: 20px auto;
}
</style>
/* 修改共用添加的对话框 设置一个状态 添加还是 修改 */
