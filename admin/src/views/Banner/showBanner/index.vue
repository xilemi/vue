<template lang="">
    <div class="swiper container" ref="swiper">
        <div class="swiper-wrapper">
            <template v-for="item in list">
                <div class="swiper-slide" :key="item.bannerid" v-if="item.flag">
                    <a :href="item.link">
                        <img :src="item.img" alt="">
                    </a>
                </div>
            </template>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>
<script>
    import swiper, { Autoplay, Pagination, Navigation } from "swiper";
    import { listBannerApi } from '@/api/banner.js'
    export default {
        name: 'showBanner',
        data() {
            return {
                swiper: null,
                list: []
            }
        },
        methods: {
            listBanner() {
                listBannerApi().then((result) => {
                    this.list = result.data
                }).catch((err) => {
                    this.$message.error(err.message)
                });
            },
            initSwiper() {
                this.swiper = new swiper(this.$refs.swiper, {
                    autoplay: {
                        delay: 2000,
                        stopOnLastSlide: false,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    },
                    loop: true, // 循环模式选项

                    observer: true,   // 监听元素自身的变化 => 重新初始化
                    observeParents: true,  // 监听父元素的变化 => 重新初始化
                    modules: [Autoplay, Pagination, Navigation],
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                })
            }
        },
        mounted() {
            this.listBanner()
            this.initSwiper()
        },
        watch: {
            list: {
                handler() {
                    this.$nextTick(() => {
                        this.swiper.destroy()
                        this.initSwiper()
                    })
                },
                deep: true
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import 'swiper/css/bundle';

    .container {
        width: 100%;

        .swiper-wrapper {
            img {
                width: 100%;
            }
        }

        .swiper-button-prev,
        .swiper-button-next {
            font-size: 40px;
        }
    }
</style>