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
	name: 'aliasArticleList',
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
					prop: 'abstract',
					label: this.$t('article.abstract'),
					sortable: false,
				},
				{
					prop: 'alias',
					label: this.$t('article.alias.label'),
					sortable: false,
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
			multipleSelection: []
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
			return axios.get('/api/tju/service/article?alias=true').then(res => {
				const data = res.data.data;

				data.forEach(element => {
                    element.title = element.tjuArticle.title;
                    element.abstract= element.tjuArticle.abstract;

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