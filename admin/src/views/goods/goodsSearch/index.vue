<template lang="">
    <div>
        <el-form :inline="true" ref="searchBar" :model="params">
            <el-form-item label="分类" size="normal" prop="category">
                <el-select v-model="params.category" placeholder="请选择">
                    <el-option :key="0" label="全部" value=""></el-option>
                    <el-option v-for="(item,index) in category" :key="index" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="搜索" size="normal" prop="search">
                <el-input v-model="params.search" placeholder="" size="normal" clearable></el-input>
            </el-form-item>
            <el-form-item label="" size="normal">
                <el-button type="primary" size="default" @click="handlerSearch()">
                    搜索
                </el-button>
                <el-button type="primary" size="default" @click="handlerReset()">
                    重置
                </el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" height="550px" border style="width: 100%;">
            <el-table-column prop="brand" label="品牌" width="150">
            </el-table-column>
            <el-table-column prop="category" label="分类" width="150">
            </el-table-column>
            <el-table-column label="图片" prop="img1" width="100">
                <template slot-scope="scope">
                    <img :src="scope.row.img1" min-width="70" height="70" />
                </template>
            </el-table-column>
            <el-table-column prop="proname" label="商品名">
            </el-table-column>
            <el-table-column prop="originprice" label="价格" width="150">
            </el-table-column>
            <el-table-column prop="discount" label="现价" width="150">
                <template v-slot="{row}">
                    <div>
                        {{row.discount*row.originprice/10}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="isrecommend" label="推荐状态" width="150">
                <template v-slot="{row}">
                    <el-switch v-model="row.isrecommend" :active-value="1" :inactive-value="0">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="isseckill" label="秒杀状态" width="150">
                <template v-slot="{row}">
                    <el-switch v-model="row.isseckill" :active-value="1" :inactive-value="0">
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>
        <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
            :page-sizes="[10, 20, 50, 100]" :page-size="params.limitNum"
            layout="total, sizes, prev, pager, next, jumper" :total="total" class="pageBar">
        </el-pagination> -->
    </div>
</template>
<script>
    // 展示所有数据 如何实现分页  后端 没有提供分页
    // 还要获取手机分类
    import { goodsSearch, getCategoryApi } from '@/api/goods.js'
    export default {
        name: 'goodsSearch',
        data() {
            return {
                tableData: [],
                // 通过返回的结果计算
                total: '',
                params: {
                    category: "",
                    search: ''
                },
                total: 0,
                category: []
            }
        },
        methods: {
            // 每页条数改变
            handleSizeChange(val) {
                this.params.limitNum = val
            },
            // 当前页改变
            handleCurrentChange(val) {
                this.params.count = val
            },
            getGoodsSearch() {
                goodsSearch(this.params).then((result) => {
                    let { data, message, total } = result
                    this.tableData = data
                    console.log(data);
                }).catch((err) => {
                    this.$message({
                        message: err
                    })
                });
            },
            handlerSearch() {
                this.getGoodsSearch()
            },
            handlerReset() {
                this.$refs.searchBar.resetFields()
            }
        },
        // 商品数据需要存在全局里吗 ?
        mounted() {
            this.getGoodsSearch()
            getCategoryApi().then(result => {
                this.category = result.data
            })
        },

    }
</script>
<style lang="scss">
    .el-select .el-input {
        width: 130px;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
</style>