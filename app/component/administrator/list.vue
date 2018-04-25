<template>
	<el-container>
		<el-header>
			<h1>
				administrator list
			</h1>
		</el-header>
		<el-main>
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
			</data-tables>
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
					width: '150'
				},
				{
					prop: 'name',
					label: 'Name',
					sortable: false,
					width: '300'
				},
				{
					prop: 'email',
					label: 'Email',
					sortable: false,
				},
				{
					prop: 'created_at',
					label: 'CreatedAt',
					sortable: true,
					width: '400'
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
		}
	}
}
</script>

