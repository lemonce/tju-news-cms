<template>
	<el-container>
		<el-header>
			<h1>
				catagory list
			</h1>
		</el-header>
		<el-main>
			<data-tables
				:data="tableData"
				border
				:search-def="searchDef"
				:checkbox-filter-def="checkboxFilterDef"
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
					align="center"
					:sortable="element.sortable"
					height="20px"
					:width="element.width">
				</el-table-column>
			</data-tables>
		</el-main>
	</el-container>
</template>

<script>
import axios from 'axios';
import dateFormat from 'dateformat';

export default {
	name: 'catagoryList',
	data() {
		return {
            column: [
				{
					prop: 'id',
					label: 'Id',
					sortable: true,
					width: '150'	
				},
				{
					prop: 'name',
					label: 'Name',
					sortable: false,
					width: '200'
				},
				{
					prop: 'description',
					label: 'Description',
					sortable: false
				},
				{
					prop: 'active',
					label: 'Active',
					sortable: false,
					width: '150'
				},
				{
					prop: 'created_at',
					label: 'CreatedAt',
					sortable: true,
					width: '300'
				}
			],
            tableData: [],
            checkboxFilterDef: {
				props: 'active',
				def: [{
				'code': 'true',
				'name': 'Active'
				}, {
				'code': 'false',
				'name': 'Freeze'
				}]
			},
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

							return axios.put(`/api/tju/service/catagory/${row.id}`, {
								active: false
							}).then(res => {
								this.updateData();
							}).catch(err => {
								this.$notify.error({
									title: 'Fail',
									message: 'The delete of catagory is failed',
									duration: 2000,
									position: 'top-left',
									offset: 100
								});
							});
						})
					}
				}]
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
			return axios.get('/api/tju/service/catagory').then(res => {
				const data = res.data.data;

				data.forEach(element => {

					element.created_at = dateFormat(element.created_at, 'yyyy/mm/dd  HH:MM');

					element.active = element.active ? 'true' : 'false';
				});


				this.tableData = res.data.data;
			});
		}
	}
}
</script>