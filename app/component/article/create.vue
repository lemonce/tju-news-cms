<template>
    <el-container>
		<el-header>
			<h1>Article</h1>
		</el-header>
		<el-main>
			<el-form
				ref="articleContent"
				:model="articleContent"
				:rules="formRules"
				label-width="100px"
				label-position="top"
				width="80"
				@submit.native.prevent="createArticle('articleContent')"
				>
				<el-form-item label="title" prop="title">
					<el-input placeholder="Please input title"
						v-model="articleContent.title"
						class="input-with-select">
						<el-select v-model="articleContent.catagory"
							style="width: 180px"
							slot="prepend" placeholder="Catagory"
							@change="isChange = true">
							<el-option v-for="item in catagorys"
								:key="item.name"
								:label="item.name"
								:value="item.id"></el-option>
						</el-select>
					</el-input>
				</el-form-item>
				<el-form-item label="abstract" prop="abstract">
					<el-input type="textarea" resize="none" rows="4" v-model="articleContent.abstract"></el-input>
				</el-form-item>
				<el-form-item v-if="isShow">
					<el-button type="primary" @click.prevent="updateArticle('articleContent')">update</el-button>
				</el-form-item>
				<el-form-item v-if="!isShow">
					<el-button type="primary" native-type="submit">Create</el-button>
					<el-button @click="resetForm('articleContent')">Reset</el-button>
				</el-form-item>
				<!-- <el-form-item label="thumbnail" prop="thumbnail">
					<el-input type="textarea" v-model="articleContent.thumbnail"></el-input>
				</el-form-item> -->
				
				<div :class="{'document-editor':!isFullScreen,'FullScreen': isFullScreen}">
					<div ref="toolbar" class="document-editor__toolbar"></div>
					<div class="document-editor__editable-container">
						<button class="danger" @click.prevent="isFullScreen = true" v-if="!isFullScreen">
							<i class="fa fa-arrows-alt"></i>
							</button>
						<button class="danger" @click.prevent="isFullScreen = false" v-if="isFullScreen">
							<i class="fa fa-compress"></i>
						</button>
						<div ref="editor" class="document-editor__editable">
							<div class="ck-content">
								<h2>Insert your article title here</h2>
								<h3>Insert the article content here</h3>
							</div>
						</div>
					</div>
				</div>
			</el-form>
		</el-main>
	</el-container>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';

import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';

import GFMDataProcessor from '@ckeditor/ckeditor5-markdown-gfm/src/gfmdataprocessor';

export default {
	name: 'createArticle',
	data() {
		return {
			articleContent: {
				title: '',
				content: '',
				abstract: '',
				thumbnail: '',
				catagory: ''
			},
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
			},
			editor: {},
			isShow: false,
			isFullScreen: false,
			isChange: false
		}
	},
	mounted() {

		const articleId = this.$route.params.id;

		if (articleId) {
			this.articleRetrive(articleId);

			this.isShow = true;
		}

		this.createEditor();

		return axios.get('/api/tju/service/catagory', {
			params: {
				active: true
			}
		}).then(res => {
			this.catagorys = res.data.data;
		});

	},
	methods: {
		articleRetrive(id) {

			return axios.get(`/api/tju/service/article/${id}`).then(res => {
				this.articleContent = res.data.data;
				
				this.editor.setData(this.articleContent.content);
			});
		},
		createEditor() {

			function Markdown( editor ) {
				editor.data.processor = new GFMDataProcessor();
			}

			DecoupledEditor.build.plugins.push(Markdown);

			DecoupledEditor.create(this.$refs.editor).then(editor => {
				this.editor = editor;

				this.$refs.toolbar.appendChild( editor.ui.view.toolbar.element );

				editor.model.document.on('change', () => {
					this.articleContent.content = editor.getData();
				});

			}).catch( error => {
				console.error( error );
			});

		},
		createArticle(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid && this.articleContent.catagory !== '') {

					const article = _.pick(this.articleContent,
						['title', 'content', 'abstract', 'thumbnail']);

					axios.post('/api/tju/service/article', article).then(res => {
						
						this.createClassification(res.data.data.id);
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

					this.$notify.error({
						title: 'Fail',
						message: 'The Form is not complete',
						duration: 2000,
						position: 'top-left',
						offset: 100
					});

					return false;
				}
			});
		},
		createClassification(articleId) {
			axios.post(`/api/tju/service/article/${articleId}/catagory/${this.articleContent.catagory}`)
				.then(() => {
					this.resetForm('articleContent');

					this.editor.setData('');

					this.$notify({
						title: 'Success',
						message: 'You have created a article',
						type: 'success',
						duration: 2000,
						position: 'top-left'
					});
				}).catch(err => {

					console.log(err);
					this.$notify.error({
						title: 'Fail',
						message: 'The catagory of article creation process failed',
						duration: 2000,
						position: 'top-left',
						offset: 100
					});
				});
		},
		updateArticle(formName) {
			
			this.$refs[formName].validate((valid) => {
				if (valid && this.articleContent.catagory !== '') {
					const article = _.pick(this.article,
						['title', 'content', 'abstract', 'thumbnail']);

					axios.put(`/api/tju/service/article/${this.articleContent.id}`, article).then(res => {

						if (this.isChange) {
							const articleId = res.data.data.id;

							this.deleteCatagory(articleId).then(() => {

								axios.post(`/api/tju/service/article/${articleId}/catagory/${this.articleContent.catagory}`)
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
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	}
}
</script>

<style>
.document-editor {
    border: 1px solid var(--ck-color-base-border);
    border-radius: var(--ck-border-radius);
    max-height: 700px;
    display: flex;
    flex-flow: column nowrap;
    overflow: hidden;
}

.FullScreen {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 100
}

.document-editor__toolbar {
    z-index: 1;
    box-shadow: 0 0 5px hsla( 0,0%,0%,.2 );
    border-bottom: 1px solid var(--ck-color-toolbar-border);
}

.document-editor__toolbar .ck-toolbar {
    border: 0;
    border-radius: 0;
}
.document-editor__editable-container {
    padding: calc( 2 * var(--ck-spacing-large) );
    background: var(--ck-color-base-foreground);
	height: 100%;

    /* Make it possible to scroll the "page" of the edited content. */
    overflow-y: scroll;
}

.document-editor__editable-container .ck-editor__editable {
    /* Set the dimensions of the "page". */
    width: 15.8cm;
    min-height: 21cm;
	

    /* Keep the "page" off the boundaries of the container. */
    padding: 1cm 2cm 2cm;

    border: 1px hsl( 0,0%,82.7% ) solid;
    border-radius: var(--ck-border-radius);
    background: white;
    box-shadow: 0 0 5px hsla( 0,0%,0%,.1 );
    margin: 0 auto;
}

.document-editor .ck-content,
.document-editor .ck-heading-dropdown .ck-list {
    font: 16px/1.6 "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.document-editor .ck-heading-dropdown .ck-dropdown__panel .ck-list > .ck-list__item {
    line-height: calc( 1.2 * var(--ck-line-height-base) * var(--ck-font-size-base) );
    min-width: 8em;
}

.document-editor .ck-content h2,
.document-editor .ck-heading-dropdown .ck-heading_heading1 {
    font-size: 2.18em;
}

.document-editor .ck-content h2 {
    line-height: 1.37em;
    padding-top: .342em;
    margin-bottom: .142em;
}

/* Set the styles for "Heading 2". */
.document-editor .ck-content h3,
.document-editor .ck-heading-dropdown .ck-heading_heading2 {
    font-size: 1.75em;
    color: hsl( 203, 100%, 50% );
}

.document-editor .ck-heading-dropdown .ck-heading_heading2.ck-list__item_active {
    color: var(--ck-color-list-item-text-active);
}

/* Set the styles for "Heading 2". */
.document-editor .ck-content h3 {
    line-height: 1.86em;
    padding-top: .171em;
    margin-bottom: .357em;
}

/* Set the styles for "Heading 3". */
.document-editor .ck-content h4,
.document-editor .ck-heading-dropdown .ck-heading_heading3 {
    font-size: 1.31em;
}

.document-editor .ck-content h4 {
    line-height: 1.24em;
    padding-top: .286em;
    margin-bottom: .952em;
}

/* Set the styles for "Paragraph". */
.document-editor .ck-content p,
.document-editor .ck-heading-dropdown .ck-heading_paragraph {
    font-size: 1em;
}

.document-editor .ck-content p {
    line-height: 1.63em;
    padding-top: .5em;
    margin-bottom: 1.13em;
}
/* Make the block quoted text serif with some additional spacing. */
.document-editor .ck-content blockquote {
    font-family: Georgia, serif;
    margin-left: calc( 2 * var(--ck-spacing-large) );
    margin-right: calc( 2 * var(--ck-spacing-large) );
}
</style>
