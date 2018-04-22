<template>
    <el-container>
		<el-header>
			<h1>create article</h1>
		</el-header>
		<el-main>
			<el-steps
			    style="margin-bottom: 50px;"
				:active="active"
				finish-status="success"
				space="30%"
				align-center>
				<el-step title="步骤 1"></el-step>
				<el-step title="步骤 2"></el-step>
				<el-step title="步骤 3"></el-step>
			</el-steps>
			<el-form
				class="col-md-6 offset-md-2"
				ref="articleContent"
				:model="articleContent"
				:rules="formRules"
				label-width="100px"
				label-position="left"
				size="medium"
				v-if="active === 0"
				@submit.native.prevent="createArticle('articleContent')">
				<el-form-item label="title" prop="title">
					<el-input v-model="articleContent.title"></el-input>
				</el-form-item>
				<el-form-item label="content" prop="content">
					<el-input type="textarea" v-model="articleContent.content"></el-input>
				</el-form-item>
				<el-form-item label="abstract" prop="abstract">
					<el-input type="textarea" v-model="articleContent.abstract"></el-input>
				</el-form-item>
				<el-form-item label="thumbnail" prop="thumbnail">
					<el-input type="textarea" v-model="articleContent.thumbnail"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" native-type="submit">Next</el-button>
				</el-form-item>
			</el-form>
			<el-form
				class="col-md-6 offset-md-2"
				ref="articleContent"
				:model="articleContent"
				:rules="formRules"
				label-width="100px"
				label-position="left"
				size="medium"
				v-if="active === 1"
				@submit.native.prevent="publishArticle()">
				<el-form-item label="catagory">
					<el-checkbox-group v-model="articleContent.catagoryList" @change="test()">
						<el-checkbox v-for="catagory in catagorys" :label="catagory.id" :key="catagory.name">{{catagory.name}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="published">
					<el-switch v-model="articleContent.published"></el-switch>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" native-type="submit">Next</el-button>
				</el-form-item>
			</el-form>
			<el-card class="box-card" v-if="active === 3">
				<div class="text item">
					The progress of create article is successful!
				</div>
			</el-card>
		</el-main>
	</el-container>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';

export default {
	name: 'createArticle',
	data() {
		return {
			active: 0,
			articleContent: {
				title: '',
				content: '',
				abstract: '',
				thumbnail: '',
				published: false,
				catagoryList: []
			},
			article: {},
			catagorys: [],
			formRules: {
				title: [
					{
						required: true,
						message: 'Please input Article title',
					},
					{
						min: 2,
						message: 'Length is at least 2',
					}
				],
				content: [
					{
						required: true,
						message: 'Please input Article content',
					},
					{
						min: 3,
						message: 'Length is at least 3',
					}
				],
				abstract: [
					{
						required: true,
						message: 'Please input Article abstract',
					}
				],
				thumbnail: [
					{
						required: true,
						message: 'Please input Article thumbnail',
					}
				]
			}
		}
	},
	mounted() {
		return axios.get('/api/tju/service/catagory', {
			params: {
				active: true
			}
		}).then(res => {
			this.catagorys = res.data.data;
		});
	},
	methods: {
		createArticle(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					const article = _.pick(this.articleContent,
						['title', 'content', 'abstract', 'thumbnail', 'published']);

					axios.post('/api/tju/service/article', article).then(res => {
						
						this.article = res.data.data;

						this.$notify({
							title: 'Success',
							message: 'You have created a article',
							type: 'success',
							duration: 2000,
							position: 'top-left'
						});

						this.active = 1;
					}).catch(err => {

						this.$notify.error({
							title: 'Fail',
							message: 'The article creation process failed',
							duration: 2000,
							position: 'top-left',
							offset: 100
						});
					});
				} else {
					return false;
				}
			});
		},
		publishArticle() {
			this.articleContent.catagoryList.forEach(catagoryId => {

				axios.post(`/api/tju/service/article/${this.article.id}/catagory/${catagoryId}`)
					.then(() => {
						axios.put(`/api/tju/service/article/${this.article.id}`, {
							published: this.articleContent.published
						}).then(() => {
							this.active = 3;
						}).catch(err => {
							this.$notify.error({
								title: 'Fail',
								message: 'The article creation process failed',
								duration: 2000,
								position: 'top-left',
								offset: 100
							});
						});
					}).catch(err => {
						this.$notify.error({
							title: 'Fail',
							message: 'The catagory of article creation process failed',
							duration: 2000,
							position: 'top-left',
							offset: 100
						});
					});
			});
		},
		test() {
				console.log(this.articleContent.catagoryList);
		}
	}
}
</script>