<template>
	<el-container>
		<el-header>
			<h1>
				Category list
			</h1>
		</el-header>
		<el-main>
			<el-form
				ref="category"
				:model="category"
				:rules="formRules"
				label-width="100px"
				label-position="top"
				height="40px"
				@submit.native.prevent="createCategory('category')">
				<el-form-item prop="name">
					<el-input placeholder="New Category" v-model="category.name">
						<el-button slot="append" native-type="submit">Create</el-button>
					</el-input>
				</el-form-item>
			</el-form>
			<data-tables
				:data="tableData"
				border
				:search-def="searchDef"
				:pagination-def="paginationDef"
				width="600px"
				ref="multipleTable"
				@selection-change="handleSelectionChange">
				<el-table-column
					prop="id"
					label="Id"
					align="center"
					sortable="true"
					width="100">
				</el-table-column>
				<el-table-column
					prop="name"
					label="Name"
					align="center"
					width="150">
				</el-table-column>
				<el-table-column
					prop="created_at"
					label="CreateAt"
					align="center"
					width="200">
				</el-table-column>
				<el-table-column
					label="active"
					prop="active"
					align="center"
					width="150">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.active" @change="updateCategory(scope.row)">
						</el-switch>
					</template>
				</el-table-column>
			</data-tables>
		</el-main>
	</el-container>
</template>

<script>
import axios from 'axios';
import dateFormat from 'dateformat';

export default {
	name: 'categoryList',
	data() {
		return {
			category: {
				name: '',
				active: true
			},
			formRules: {
				name: [
					{
						required: true,
						message: 'Please input Category name',
					},
					{
						min: 2,
						message: 'Length is at least 2',
					}
				]
			},
            tableData: [],
			searchDef: {
				show: false
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20],
            },
			multipleSelection: [],
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
			return axios.get('/api/tju/service/category').then(res => {
				const data = res.data.data;

				data.forEach(element => {

					element.created_at = dateFormat(element.created_at, 'yyyy/mm/dd  HH:MM');
				});


				this.tableData = res.data.data;
			});
		},
		updateCategory(row) {
			return axios.put(`/api/tju/service/category/${row.id}`, {
					active: row.active
				}).then(res => {
					this.updateData();
				}).catch(err => {
					this.$notify.error({
						title: 'Fail',
						message: 'The change category is failed',
						duration: 2000,
						position: 'top-left',
						offset: 100
					});
				});
		},
		resetForm(formName) {
        	this.$refs[formName].resetFields();
		},
		createCategory(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					axios.post('/api/tju/service/category', this.category).then(res => {
						this.resetForm(formName);
						this.updateData();
						
						this.$notify({
							title: 'Success',
							message: 'You have created a category',
							type: 'success',
							duration: 2000,
							position: 'top-left'
						});
					}).catch(err => {

						this.$notify.error({
							title: 'Fail',
							message: 'The creation process failed',
							duration: 2000,
							position: 'top-left',
							offset: 100
						});
					});
				} else {
					return false;
				}
			});
		} 
	}
}
</script>