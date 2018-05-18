<template>
    <editor>
        <template slot-scope="article">
            <el-button type="primary"
				@click="createArticle(article.articleObject, article.form, article.editor)">{{$t('user.create')}}</el-button>
            <el-button @click="resetForm(article.form)">{{$t('user.reset')}}</el-button>
        </template>
    </editor>
</template>

<script>
import axios from 'axios';

import Editor from './article';

export default {
	name: 'createArticle',
	components: {
		Editor
	},
	methods: {
		createArticle(articleObject, form, editor) {

			form.validate((valid) => {
				if (valid && articleObject.category !== null) {

					const article = _.pick(articleObject,
						['title', 'content', 'abstract', 'category', 'alias']);

					axios.post('/api/tju/service/article', article).then(res => {
						this.resetForm(form);

						editor.setData('');

						this.$notify({
							title: 'Success',
							message: 'You have created a article',
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

					if (!valid) {
						this.$message({
							type: 'warning',
							message: 'Please fill the form'
						});
					} else {
						this.$message({
							type: 'warning',
							message: 'Please choose a category'
						});
					}

					return false;
				}
			});
		},
		resetForm(form) {
			form.resetFields();
		}
	}
}
</script>