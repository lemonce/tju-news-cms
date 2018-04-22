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
							@click.native.prevent="disableCatagory(scope.$index)"
							type="text"
							:disabled="scope.row.active === 'false'">
							disable
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
	name: 'catagoryList',
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
					prop: 'description',
					label: 'Description',
					sortable: false
				},
				{
					prop: 'active',
					label: 'Active',
					sortable: false
				},
				{
					prop: 'created_at',
					label: 'CreatedAt',
					sortable: true
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
            radioState: ''
		}
	},
	mounted() {
        return axios.get('/api/tju/service/catagory').then(res => {
			const data = res.data.data;

			data.forEach(element => {

				element.created_at = dateFormat(element.created_at, 'yyyy/mm/dd  HH:MM');

				element.active = element.active ? 'true' : 'false';
			});


            this.tableData = res.data.data;
		});
	},
	methods: {
        disableCatagory(index) {
			const id = this.tableData[index].id;

			return axios.put(`/api/tju/service/catagory/${id}`, {
                active: false
            }).then(res => {
				this.disabledState[id] = true;
			});
        }
	}
}
</script>