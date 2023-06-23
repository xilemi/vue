<template lang="">
    <div>
        <el-table :data="listBanner" border v-if="listBanner">
            <el-table-column prop="img" label="图片" width="400">
                <template v-slot="{row}">
                    <div>
                        <img :src="row.img" alt="" style="width: 350px;">
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="link" label="链接地址" width="auto">
            </el-table-column>
            <el-table-column prop="alt" label="提示信息" width="180">
            </el-table-column>
            <el-table-column prop="flag" label="展示状态" width="180">
                <template v-slot="{row}">

                    <el-switch v-model="row.flag" @change="updateBannerFlag(row.bannerid,$event)">
                    </el-switch>

                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template v-slot="{row}">
                    <el-button type="primary" @click="delHandler(row.bannerid)"
                        v-authority:disabled="2222">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>
<script>
    import { updateBannerFlagApi, delBannerApi, listBannerApi } from '@/api/banner.js'
    export default {
        name: 'listBanner',
        data() {
            return {
                listBanner: null,
                paramsFlag: {
                    bannerid: '',
                    flag: ''
                }
            }
        },
        methods: {
            //获取banner列表
            getListBanner() {
                listBannerApi().then(result => {
                    console.log(result.data);
                    this.listBanner = result.data
                }).catch(err => {
                    this.$message.error(err.message)
                })
            },
            // 删除轮播图
            delHandler(bannerid) {
                delBannerApi({ bannerid }).then(res => {
                    let index = this.listBanner.findIndex(item => {
                        return item.bannerid == bannerid
                    })
                    console.log(index);
                    this.listBanner.splice(index, 1)
                }).catch(err => {
                    this.$message.error(err.message)
                })
            },
            // 修改轮播展示状态
            updateBannerFlag(bannerid, val) {
                this.paramsFlag.bannerid = bannerid
                this.paramsFlag.flag = val
                updateBannerFlagApi(this.paramsFlag).then().catch(err => {
                    this.$message.error(err.message)
                })
            }
        },
        mounted() {
            this.getListBanner()
        },
        watch: {
            paramsFlag: {
                handler() {
                    this.updateBannerFlag()
                },
                deep: true
            }
        }
    }
</script>
<style lang="">

</style>