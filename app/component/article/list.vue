<template>
	<el-container>
		<el-header>
			<h1>
				{{$t('article.list')}}
			</h1>
			<hr>
		</el-header>
		<el-main>
			<data-tables
				:data="tableData"
				border
				:search-def="searchDef"
				:pagination-def="paginationDef"
				:actions-def="actionsDef"
				ref="multipleTable"
				@selection-change="handleSelectionChange"
				:col-not-row-click="canNotClickList"
				@row-click="articleContent">
				<el-table-column
					type="selection"
					width="55"></el-table-column>
				<el-table-column
					v-for="(element, index) in column"
					v-bind:key="index"
					:prop="element.prop"
					:width="element.width"
					:label="element.label"
					align="center"
					:sortable="element.sortable">
				</el-table-column>
				<el-table-column
					:label="$t('editor')"
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
		</el-main>
	</el-container>
</template>

<script>
import axios from 'axios';
import dateFormat from 'dateformat';

export default {
	name: 'articleList',
	data() {
		return {
			column: [
				{
					prop: 'id',
					label: this.$t('id'),
					sortable: false,
					width: "150"
				},
				{
					prop: 'title',
					label: this.$t('article.title'),
					sortable: false,
				},
				{
					prop: 'author',
					label: this.$t('article.author'),
					sortable: false,
					width: '250'
				},
				{
					prop: 'created_at',
					label: this.$t('article.createdAt'),
					sortable: true,
					width: '250'
				}
			],
			tableData: [],
			radioState: '',
			searchDef: {
				show: true,
				props: 'title'
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20],
			},
			canNotClickList: ['abstract', 'author', 'created_at', 'editor'],
			multipleSelection: [],
			actionsDef: {
				def: [{
					name: 'delete',
					handler: () => {
						this.multipleSelection.forEach(row => {

							return axios.delete(`/api/tju/service/article/${row.id}`).then(res => {
								this.updateData();
							}).catch(err => {
								this.$notify.error({
									title: 'Fail',
									message: 'The delete of article is failed',
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
		deleteRow(index) {
			const id = this.tableData[index].id;

			return axios.delete(`/api/tju/service/article/${id}`).then(res => {
				this.tableData.splice(index, 1);
				this.disabledState.splice(index, 1);
			});
		},
		editorRow(row) {
			const id = row.id;

			this.$router.push({ path: `/tju/article/${id}/update`});
		},
		articleContent(val) {
			// this.$router.push({ path: `/tju/article/${val.id}/detail`});
		},
		updateData() {
			return axios.get('/api/tju/service/article').then(res => {
				const data = res.data.data;

				data.forEach(element => {

					element.created_at = dateFormat(element.created_at, 'yyyy/mm/dd  HH:MM');
				});

				this.tableData = res.data.data;
			});
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
	}
}
</script>