<template>
	<editor :id="id">
		<template slot-scope="article">
			<el-button type="primary"
				@click="updateArticle(article.articleObject, article.form, article.isChange)"
			>
				
				Update
			</el-button>
		</template>
	</editor>
</template>

<script>
import axios from 'axios';

import Editor from './article';

export default {
	name: 'updateArticle',
	data() {
		return {
			id: ''
		}
	},
	components: {
		Editor
	},
	mounted() {
		this.id = this.$route.params.id;
	},
	methods: {
		updateArticle(articleObject, form, isChange) {
			form.validate((valid) => {
				if (valid) {
					const article = _.pick(articleObject,
						['title', 'content', 'abstract', 'thumbnail']);

						console.log(article);

					axios.put(`/api/tju/service/article/${articleObject.id}`, article).then(res => {

						if (isChange) {
							const articleId = res.data.data.id;

							this.deleteCatagory(articleId).then(() => {

								axios.post(`/api/tju/service/article/${articleId}/catagory/${articleObject.catagory}`)
									.then(() => {
										this.$notify({
											title: 'Success',
											message: 'You have update a article',
											type: 'success',
											duration: 2000,
											position: 'top-left'
										});
									});

							}).catch(err => {
								this.$notify.error({
									title: 'Fail',
									message: 'The change of catagory failed',
									duration: 2000,
									position: 'top-left',
									offset: 100
								});
							});
						}

					}).then(() => {
						this.$notify({
							title: 'Success',
							message: 'You have update a article',
							type: 'success',
							duration: 2000,
							position: 'top-left'
						});
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
		deleteCatagory(id) {

			return axios.get(`/api/tju/service/article/${id}`).then(res => {
				const article = res.data.data;

				axios.delete(`/api/tju/service/article/${article.id}/catagory/${article.catagory}`);
			});
		}
	}
}
//update 是否允许没有类的再创建类？
</script>