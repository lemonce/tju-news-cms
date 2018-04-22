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
				style="width: 80%">
				<el-table-column
					v-for="(element, index) in column"
					v-bind:key="index"
					:prop="element.prop"
					:label="element.label"
					align="center"
					:sortable="element.sortable"
					height="20px">
				</el-table-column>
				<el-table-column
					label="Operation"
					align="center">
					<template slot-scope="scope">
						<el-button
							@click.native.prevent="deleteRow(scope.$index)"
							type="text">
							delete
						</el-button>
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
	name: 'administratorList',
	data() {
		return {
			column: [
				{
					prop: 'id',
					label: 'Number',
					sortable: true	
				},
				{
					prop: 'name',
					label: 'Name',
					sortable: false
				},
				{
					prop: 'email',
					label: 'Email',
					sortable: false
				},
				{
					prop: 'created_at',
					label: 'CreatedAt',
					sortable: true
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
			}
		}
	},
	mounted() {
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
	methods: {
		deleteRow(index) {
			const id = this.tableData[index].id;

			return axios.delete(`/api/tju/service/administrator/${id}`).then(res => {
				this.tableData.splice(index, 1);
			});
		}
	}
}
</script>

