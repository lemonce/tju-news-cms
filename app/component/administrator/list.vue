<template>
	<el-container>
		<el-header>
			<h1>
				administrator list
			</h1>
			<hr>
		</el-header>
		<el-main>
			<el-row :gutter="20">

				<el-col :span="14">
					<div class="grid-content bg-purple">
						<data-tables
							:data="tableData"
							border
							:search-def="searchDef"
							:pagination-def="paginationDef"
							:actions-def="actionsDef"
							ref="multipleTable"
							@selection-change="handleSelectionChange">
							<el-table-column
								type="selection"
								width="55"></el-table-column>
							<el-table-column
								v-for="(element, index) in column"
								v-bind:key="index"
								:prop="element.prop"
								:label="element.label"
								:width="element.width"
								align="center"
								:sortable="element.sortable"
								height="20px">
							</el-table-column>
							<el-table-column
								label="Editor"
								prop="editor"
								align="center"
								width='150'>
								<template slot-scope="scope">
									<el-button
										@click.native.prevent="editorRow(scope.row)"
										type="text">
										<i class="fa fa-pencil fa-fw" aria-hidden="true"></i>
									</el-button>
								</template>
							</el-table-column>
						</data-tables>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple-light">
						<el-card class="box-card" shadow="never">
							<div slot="header" class="clearfix">
								<span>Create an administrator</span>
							</div>
							<el-form :model="userForm"
								:rules="userRule"
								ref="userForm"
								label-width="100px"
								label-position="left">
								<el-form-item
									:label="$t('user.name')"
									prop="name">
									<el-input v-model="userForm.name"></el-input>
								</el-form-item>

								<el-form-item
									:label="$t('user.password')"
									prop="password">
									<el-input v-model="userForm.password"></el-input>
								</el-form-item>

								<el-form-item
									:label="$t('user.email')"
									prop="email">
									<el-input v-model="userForm.email"></el-input>
								</el-form-item>

								<el-form-item>
									<el-button
										type="primary"
										native.type="submit"
										@click="createAdministrator('userForm')">{{$t('user.create')}}</el-button>
								</el-form-item>
							</el-form>
						</el-card>
						<!-- <el-card class="box-card" shadow="never">
							<div slot="header" class="clearfix">
								<span>Modify the password</span>
							</div>
							<el-form :model="userForm"
								:rules="userRule"
								ref="userForm"
								label-width="100px"
								label-position="left">

								<el-form-item
									:label="$t('user.password')"
									prop="password">
									<el-input v-model="userForm.password"></el-input>
								</el-form-item>

								<el-form-item>
									<el-button
										type="primary"
										native.type="submit"
										@click="updateUser('userForm')">{{$t('user.put')}}</el-button>
								</el-form-item>
							</el-form>
						</el-card> -->
					</div>
				</el-col>
			</el-row>
		</el-main>
	</el-container>
</template>

<script>
import axios from 'axios';
import dateFormat from 'dateformat';

export default {
	name: 'administratorList',
	data() {
		return {
			column: [
				{
					prop: 'id',
					label: 'Id',
					sortable: true,
					width: '70'
				},
				{
					prop: 'name',
					label: 'Name',
					sortable: false,
					width: '100'
				},
				{
					prop: 'email',
					label: 'Email',
					sortable: false,
					width: '300'
				},
				{
					prop: 'created_at',
					label: 'CreatedAt',
					sortable: true,
					width: '200'
				}
			],
			tableData: [],
			searchDef: {
				show: true,
				props: 'name'
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20],
			},
			multipleSelection: [],
			actionsDef: {
				def: [{
					name: 'delete',
					handler: () => {
						this.multipleSelection.forEach(row => {

							return axios.delete(`/api/tju/service/administrator/${row.id}`).then(res => {
								this.updateData();
							}).catch(err => {
								this.$notify.error({
									title: 'Fail',
									message: 'The delete of admin is failed',
									duration: 2000,
									position: 'top-left',
									offset: 100
								});
							});
						})
					}
				}]
			},
			userForm: {
				name: '',
				password: '',
				email: ''
			},

			userRule: {
				name: [
					{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					},
					{
						min: 4,
						max: 128,
						message: '用户名长度应在4到128位之间',
						trigger: 'blur'
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					},
					{
						min: 6,
						max: 32,
						message: '密码长度应在6到32位之间',
						trigger: 'blur'
					}
				],
				email: [
					{
						required: true,
						message: '请输入邮箱',
						trigger: 'blur'
					}
				]
			}
		}
	},
	mounted() {
		this.updateData();
	},
	methods: {
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		updateData() {
			return axios.get('/api/tju/service/administrator').then(res => {
				const data = res.data.data;

				data.forEach(element => {
					if (!element.email) {
						element.email = "--"
					}

					element.created_at = dateFormat(element.created_at, 'yyyy/mm/dd  HH:MM');
				});

				this.tableData = res.data.data;
			});
		},
		createAdministrator(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {

					return axios.post('/api/tju/service/administrator', this.userForm).then(res => {
						this.updateData();
					});
				} else {
					this.$notify.error({
						title: '错误',
						message: '请把表单填写完整。'
					});
				}
			});
		},
		editorRow(row) {
			this.$prompt('Please input your new password', 'Message', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel',
				inputPattern: /[\w]+/,
		  		inputErrorMessage: 'Invalid Password',
			}).then(result => {
		  
				return axios.put(`/api/tju/service/administrator/${row.id}/password`, {
					password: result.value
				}).then(res => {
						this.$message({
							type: 'success',
							message: 'Successful'
						});
					}).catch(() => {
						this.$message({
							type: 'warning',
							message: 'Fail'
						});       
					});
			});
		}
	}
}
</script>

