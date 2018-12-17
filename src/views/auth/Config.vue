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

        <el-table :data="configMappings" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column type="selection" width="65"/>
            <el-table-column prop="id" label="ID" width="70"/>
            <el-table-column prop="sceneName" label="场景" width="120"/>
            <el-table-column prop="uri" label="请求接口" width="220"/>
            <el-table-column prop="method" label="请求方式" width="100"/>
            <el-table-column prop="sceneIntroduction" label="场景介绍" width="400"/>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small" @click="showEditDialog(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="deleteConfigMappings(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="编辑" class="dl-edit" v-model="editDialog.visible" :close-on-click-modal="false">
            <el-form :model="editDialog.form" label-width="80px" ref="editDialog.form">
                <el-form-item label="名称" prop="sceneName">
                    <el-input v-model="editDialog.form.sceneName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="sceneIntroduction">
                    <el-input type="textarea" :rows="4" v-model="editDialog.form.sceneIntroduction"></el-input>
                </el-form-item>
                <el-form-item label="配置">
                    <el-table class="tb-edit" :data="editDialog.form.filters" highlight-current-row ref="tbEdit">
                        <el-table-column type="selection" width="70"/>
                        <el-table-column prop="filterName" label="过滤器名称" width="174"/>
                        <el-table-column prop="filterOrder" label="优先级" width="174">
                            <template slot-scope="scope">
                                <el-input size="small" v-model="scope.row.filterOrder"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="180">
                            <template scope="scope">
                                <el-button type="danger" size="small"
                                           @click="deleteConfigMappings(scope.$index, scope.row)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editDialog.visible = false">取消</el-button>
                <el-button type="primary" @click.native="" :loading="editDialog.loading">提交</el-button>
            </div>
        </el-dialog>

    </section>
</template>

<script>
    import {getConfigMappingsPage} from '../../api/api';

    export default {
        data() {
            return {
                configMappings: [],
                total: 0,
                page: 1,
                listLoading: false,

                addDialog: {
                    visible: false,
                    loading: false,
                    form: {
                        sceneName: '',
                        uri: '',
                        method: '',
                        sceneIntroduction: '',
                        filters: []
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
                },

                editDialog: {
                    visible: false,
                    loading: false,
                    form: {
                        id: '',
                        sceneName: '',
                        uri: '',
                        method: '',
                        sceneIntroduction: '',
                    },
                    currentRow: null
                }
            }
        },
        methods: {
            getConfigMappings() {
                let para = {
                    page: this.page,
                };
                this.listLoading = true;
                getConfigMappingsPage(para).then((res) => {
                    console.log(res);
                    this.total = res.data.total;
                    this.configMappings = res.data.configMappings;
                    this.listLoading = false;
                });
            },
            showEditDialog: function (index, row) {
                this.editDialog.visible = true;
                this.editDialog.form = Object.assign({}, row)
            },
            deleteConfigMappings: function (index, row) {
                console.log(row);
            }
        },
        mounted() {
            this.getConfigMappings();
        }
    }

</script>

<style scoped>
</style>