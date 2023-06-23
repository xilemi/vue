<template lang="">
    <div>
        <div style="margin: 20px">
            <el-radio-group v-model="uploadType" size="medium">
                <el-radio-button label="online">在线上传</el-radio-button>
                <el-radio-button label="local">本地上传</el-radio-button>
            </el-radio-group>
        </div>
        <el-form label-width="100px" :model="imgParams" class="formImg" ref="formImg">
            <template v-if="uploadType=='online'">
                <el-form-item label="在线上传:" size="normal" prop="img"
                    :rules="[{required:true,message:'请填写图片地址',trigger:'blur'}]">
                    <el-input v-model="imgParams.img" placeholder="" size="normal"></el-input>

                </el-form-item>

            </template>
            <template v-else>
                <el-form-item label="本地上传:" size="normal" prop="img"
                    :rules="[{required:true,message:'请填写图片地址',trigger:'blur'}]">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false" :limit="1"
                        :file-list="fileList" :on-change="uploadHandler" list-type="picture" ref="imgUpload">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超500kb</div>
                    </el-upload>
                </el-form-item>

            </template>

            <el-form-item label="提示信息:" size="normal" prop="alt"
                :rules="[{required:true,message:'请填写图提示信息',trigger:'blur'}]">
                <el-input v-model="imgParams.alt" placeholder="" size="normal"></el-input>
            </el-form-item>
            <el-form-item label="链接地址:" size="normal" prop="link"
                :rules="[{required:true,message:'请填写图连接地址',trigger:'blur'}]">
                <el-input v-model="imgParams.link" placeholder="" size="normal"></el-input>
            </el-form-item>
            <el-form-item label="" size="normal">
                <el-button type="primary" size="default" @click="submitHandler()">提交</el-button>
                <el-button type="primary" size="default" @click="resetHandler()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import { addBannerApi } from '@/api/banner.js'
    import { imgBase64 } from '@/utils/imgBase64.js'
    export default {
        name: 'addBanner',
        data() {
            return {
                uploadType: "local",
                imgParams: {
                    img: '',
                    alt: '小米',
                    link: 'https://www.mi.com/shop/buy?product_id=10050034'
                },
                fileList: []
            }
        },
        methods: {
            submitHandler() {
                // 提交完清空
                this.addBanner()
                this.$refs.formImg.resetFields()
                this.$refs.imgUpload.clearFiles()
            },
            resetHandler() {
                // 清空
                this.$refs.formImg.resetFields()
            },
            addBanner() {
                this.$refs.formImg.validate((bool, failField) => {
                    if (bool) {
                        addBannerApi(this.imgParams).then((result) => {

                        }).catch((err) => {
                            this.$message.error(err.message)
                        })
                    }
                })
            },
            uploadHandler(file, fileList) {
                imgBase64(file.raw).then(res => {
                    this.imgParams.img = res
                })
            }
        },
    }
</script>
<style lang="scss">
    .formImg {
        width: 800px;
    }
</style>