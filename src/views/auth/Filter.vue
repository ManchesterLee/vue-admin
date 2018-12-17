<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addDialog.visible = true">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="rules" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column type="selection" width="65"/>
            <el-table-column type="index" width="70"/>
            <el-table-column prop="ruleId" label="ID" width="240"/>
            <el-table-column prop="ruleName" label="名称" width="240"/>
            <el-table-column prop="ruleIntroduction" label="简介" width="360"/>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addDialog.visible" :close-on-click-modal="false">
            <el-form :model="addDialog.form" label-width="80px" :rules="addDialog.rules" ref="addForm">
                <el-form-item label="ID" prop="id">
                    <el-input v-model="addDialog.form.id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="addDialog.form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="introduction">
                    <el-input type="textarea" :rows="5" v-model="addDialog.form.introduction"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addDialog.visible = false">取消</el-button>
                <el-button type="primary" @click.native="saveFilter" :loading="addDialog.loading">提交</el-button>
            </div>
        </el-dialog>

    </section>
</template>

<script>
    //import NProgress from 'nprogress'
    import {getFiltersPage, saveFilter} from '../../api/api';

    export default {
        data() {
            return {
                rules: [],
                total: 0,
                page: 1,
                listLoading: false,

                addDialog: {
                    visible: false,
                    loading: false,
                    form: {
                        id: '',
                        name: '',
                        introduction: '',
                    },
                    rules: {
                        'id': [
                            {required: true, message: '请输入ID', trigger: 'blur'}
                        ],
                        'name': [
                            {required: true, message: '请输入名称', trigger: 'blur'}
                        ],
                        'introduction': [
                            {required: true, message: '请输入简介', trigger: 'blur'}
                        ]
                    }
                }
            }
        },
        methods: {
            getFilters() {
                let para = {
                    page: this.page,
                };
                this.listLoading = true;
                //NProgress.start();
                getFiltersPage(para).then((res) => {
                    this.total = res.data.total;
                    this.rules = res.data.rules;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            saveFilter() {
                this.addDialog.loading = true;
                let params = this.addDialog.form;
                saveFilter(params).then((res) => {
                    console.log(res);
                    this.addDialog.loading = false;
                    this.addDialog.visible = false;
                });
            }
        },
        mounted() {
            this.getFilters();
        }
    }

</script>

<style scoped>

</style>