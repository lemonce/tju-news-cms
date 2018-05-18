<template>
	<editor :id="id">
		<template slot-scope="article">
			<el-button type="primary"
				@click="updateArticle(article.articleObject, article.form, article.isChange)"
			>
				{{$t('user.update')}}
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
						['title', 'content', 'abstract', 'category', 'alias']);


					axios.put(`/api/tju/service/article/${articleObject.id}`, article).then(res => {
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
		}
	}
}
//update 是否允许没有类的再创建类？
</script>