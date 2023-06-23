<template lang="">
    <div>
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column prop="brand" label="品牌" width="150">
            </el-table-column>
            <el-table-column prop="category" label="分类" width="150">
            </el-table-column>
            <el-table-column label="图片" prop="img1" width="100">
                <template v-slot="{row,clunm,index}">
                    <img :src="row.img1" width="100%" />
                </template>
            </el-table-column>
            <el-table-column prop="proname" label="商品名">
            </el-table-column>
            <el-table-column prop="originprice" label="原价" width="120">
            </el-table-column>
            <el-table-column prop="discount" label="现价" width="120">
                <template v-slot="{row}">
                    <div>
                        {{row.discount*row.originprice/10}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="isrecommend" label="推荐状态" width="120">
                <template v-slot="{row}">
                    <el-switch v-model="row.isrecommend" :active-value="1" :inactive-value="0"
                        @change="updateGoodsRecommendFlag(row.proid,$event)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="isseckill" label="秒杀状态" width="120">
                <template v-slot="{row}">
                    <el-switch v-model="row.isseckill" :active-value="1" :inactive-value="0"
                        @change="updateGoodsSeckillFlag(row.proid,$event)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template v-slot="{row}">
                    <el-button type="small" size="default" @click="detailHandler(row.proid)">详情</el-button>
                    </elb>
                </template>
            </el-table-column>
        </el-table>
        <!-- 底部分页 -->
        <el-pagination @size-change="handleSizeChange($event)" @current-change="handleCurrentChange($event)"
            :current-page="1" :page-sizes="[5, 10, 20, 50]" :page-size="params.limitNum"
            layout="prev, pager, next, total,sizes,jumper " :total="total" class="pageBar" background>
        </el-pagination>
        <!-- 详情展示 -->
        <el-drawer :visible.sync="isDrawer" size="50%">
            <el-descriptions class="margin-top" title="商品详情" :column="1" border v-if="proDetail" style="padding: 20px;"
                :labelStyle="{
                whiteSpace:'nowrap',
                textAlign:'right',
            }">
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        商品品牌
                    </template>
                    {{proDetail.brand}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        商品分类
                    </template>
                    {{proDetail.category}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        商品名
                    </template>
                    {{proDetail.proname}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        商品描述
                    </template>
                    {{proDetail.desc}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        图片
                    </template>
                    <img :src="proDetail.img1" alt="" width="100">
                </el-descriptions-item>
            </el-descriptions>
        </el-drawer>
    </div>

</template>
<script>
    import { goodsList, updateFlag, getDetailApi } from '@/api/goods.js'
    export default {
        name: 'goodsList',
        data() {
            return {
                tableData: [],
                total: 0,
                params: {
                    count: 1,
                    limitNum: 5
                },
                paramsFlag: {
                    proid: '',
                    type: '',
                    flag: '',
                },
                isDrawer: false,
                proDetail: null
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
            getGoodsList() {
                goodsList(this.params).then((result) => {
                    let { data, message, total } = result
                    this.tableData = data
                    this.total = total
                    console.log(data);
                }).catch((err) => {
                    this.$message({
                        message: err
                    })
                });
            },
            updateGoodsRecommendFlag(proid, val) {
                console.log(proid);
                this.paramsFlag.proid = proid;
                this.paramsFlag.type = "isrecommend";
                this.paramsFlag.flag = val
                updateFlag(this.paramsFlag).then(result => {

                }).catch((err) => {
                    this.$message({
                        message: err
                    })
                });
            },
            updateGoodsSeckillFlag(proid, val) {
                this.paramsFlag.proid = proid;
                this.paramsFlag.type = "isseckill";
                this.paramsFlag.flag = val
                updateFlag(this.paramsFlag).then(result => {
                }).catch((err) => {
                    this.$message({
                        message: err
                    })
                });
            },
            detailHandler(proid) {
                // 发请求查看商品详情
                getDetailApi({ proid }).then(res => {

                    this.proDetail = res.data[0]
                    console.log(this.proDetail);
                }).catch(err => {
                    this.$message.error(err.message);
                })
                this.isDrawer = !this.isDrawer
            }
        },
        // 商品数据需要存在全局里吗 ?
        mounted() {
            this.getGoodsList()
        },
        watch: {
            params: {
                handler() {
                    this.getGoodsList()
                },
                deep: true
            }
        }
    }
</script>
<style lang="scss">
    .pageBar {
        margin-top: 10px;
        text-align: center;
    }
</style>