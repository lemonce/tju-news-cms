<template>
	<el-container>
		<el-header>
			<h1>
				article list
			</h1>
		</el-header>
		<el-main>
			<data-tables
				:data="tableData"
				border
				:search-def="searchDef"
				:checkbox-filter-def="checkboxFilterDef"
				:pagination-def="paginationDef"
				style="width: 90%">
				<el-table-column
					v-for="(element, index) in column"
					v-bind:key="index"
					:prop="element.prop"
					:label="element.label"
					align="center"
					:sortable="element.sortable">
				</el-table-column>
				<el-table-column
					label="Operation"
					align="center"
					>
					<template slot-scope="scope">
						<el-button
							@click.native.prevent="editorRow(scope.$index)"
							type="text"
							:disabled="scope.row.published === 'true'">
							editor
						</el-button>
						<el-button
							@click.native.prevent="deleteRow(scope.$index)"
							type="text"
							:disabled="scope.row.published === 'true'">
							delete
						</el-button>
					</template>
				</el-table-column>
				<el-table-column
					label="Content"
					align="center"
					>
					<template slot-scope="scope">
						<el-button
							@click.native.prevent="articleContent(scope.$index)"
							type="text">
							details
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
					prop: 'title',
					label: 'Title',
					sortable: false
				},
				{
					prop: 'abstract',
					label: 'Abstract',
					sortable: false
				},
				{
					prop: 'published',
					label: 'Published',
					sortable: false
				},
				{
					prop: 'author',
					label: 'Author',
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
				props: 'published',
				def: [{
				'code': 'true',
				'name': 'Published'
				}, {
				'code': 'false',
				'name': 'Unpublished'
				}]
			},
			radioState: '',
			searchDef: {
				show: true,
				props: 'title'
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20],
			}
		}
	},
	mounted() {
		return axios.get('/api/tju/service/article').then(res => {
			const data = res.data.data;

			data.forEach(element => {

				element.created_at = dateFormat(element.created_at, 'yyyy/mm/dd  HH:MM');

				element.published = element.published ? 'true' : 'false';
			});

			this.tableData = res.data.data;
		});
	},
	methods: {
		deleteRow(index) {
			const id = this.tableData[index].id;

			return axios.delete(`/api/tju/service/article/${id}`).then(res => {
				this.tableData.splice(index, 1);
				this.disabledState.splice(index, 1);
			});
		},
		editorRow(index) {
			const id = this.tableData[index].id;

			return axios.get(`/api/tju/service/article/${id}`).then(res => {
				console.log(res.data.data);
			});
		},
		articleContent(index) {
			const id = this.tableData[index].id;

			return axios.get(`/api/tju/service/article/${id}/content`).then(res => {
				console.log(res.data.data);
			});
		}
	}
}
</script>