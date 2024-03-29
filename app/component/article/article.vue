<template>
    <el-container>
		<el-header>
			<h1>{{$t('article.retrive')}}</h1>
			<hr>
		</el-header>
		<el-main>
			<el-form
				ref="articleContent"
				:model="articleContent"
				:rules="formRules"
				label-width="100px"
				label-position="top"
				width="80">
				<el-form-item :label="$t('article.title')" prop="title">
					<el-input :placeholder="$t('message.content')"
						v-model="articleContent.title"
						class="input-with-select">
						<el-select v-model="articleContent.category"
							style="width: 180px"
							slot="prepend" :placeholder="$t('article.category')"
							@change="isChange = true">
							<el-option v-for="item in categoryList"
								:key="item.name"
								:label="item.name"
								:value="item.id"></el-option>
						</el-select>
					</el-input>
				</el-form-item>
				<el-form-item :label="$t('article.abstract')" >
					<el-input type="textarea" resize="none" rows="4" v-model="articleContent.abstract"></el-input>
				</el-form-item>
				<el-form-item :label="$t('article.createtime')">
					<el-date-picker
						v-model="articleContent.created_at"
						type="datetime"
						placeholder="选择日期时间"
						align="right"
						:picker-options="pickerOptions">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<slot
						:articleObject="articleContent"
						:form="this.$refs['articleContent']"
						:editor="editor"
						:isChange="isChange"
						></slot>
				</el-form-item>
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
								<h3>{{$t('content')}}</h3>
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
import GFMDataProcessor from '@ckeditor/ckeditor5-markdown-gfm/src/gfmdataprocessor';

import UploadAdapter from '../../adapter';

export default {
	name: 'editor',
	props: ['id'],
	data() {
		return {
			articleContent: {
				title: '',
				content: '',
				abstract: '',
				alias: '',
				category: null,
				created_at: ''
			},
			categoryList: [],
			formRules: {
				title: [
					{
						required: true,
						message: this.$t('message.content'),
					},
					{
						min: 2,
						message: this.$t('message.length'),
					}
				],
				// alias: [
				// 	{
				// 		max: 16,
				// 		message: 'Length is less than 16',
				// 	}
				// ]
			},
			editor: {},
			isFullScreen: false,
			isChange: false,
			pickerOptions: {
				shortcuts: [{
					text: '今天',
					onClick(picker) {
					picker.$emit('pick', new Date());
					}
				}, {
					text: '昨天',
					onClick(picker) {
					const date = new Date();
					date.setTime(date.getTime() - 3600 * 1000 * 24);
					picker.$emit('pick', date);
					}
				}, {
					text: '一周前',
					onClick(picker) {
					const date = new Date();
					date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
					picker.$emit('pick', date);
					}
				}]
			}
		}
	},
	mounted() {

		this.createEditor().then(() => {
			
			axios.get('/api/tju/service/category', {
				params: {
					active: true
				}
			}).then(res => {
				this.categoryList = res.data.data;
			});

		}).then(() => {

			if (this.id) {
	
				axios.get(`/api/tju/service/article/${this.id}`).then(res => {
					this.articleContent = res.data.data;
	
					this.editor.setData(this.articleContent.content);
				});
			}
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
			
			// function Markdown( editor ) {
			// 	editor.data.processor = new GFMDataProcessor();
			// }

			// DecoupledEditor.build.plugins.push(Markdown);

			return DecoupledEditor.create(this.$refs.editor).then(editor => {
				this.editor = editor;
				this.$refs.toolbar.appendChild( editor.ui.view.toolbar.element );
				
				editor.plugins.get( 'FileRepository' ).createUploadAdapter = function( loader ) {
					return new UploadAdapter( loader );
				};
			
				editor.model.document.on('change', () => {
					this.articleContent.content = editor.getData();
				});


			}).catch( error => {
				console.error( error );
			});

		},
	}
}
</script>

<style>
.document-editor {
    border: 1px solid var(--ck-color-base-border);
    border-radius: var(--ck-border-radius);
	max-height: 700px;
	width: auto;
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

    /* Keep the "page" off the boundaries of the container. */
    /* padding: 1cm 2cm 2cm; */
    padding: 50px 100px 100px;

    border: 1px hsl( 0,0%,82.7% ) solid;
    border-radius: var(--ck-border-radius);
    background: white;
    box-shadow: 0 0 5px hsla( 0,0%,0%,.1 );
    margin: 0 auto;
}
.document-editor__editable-container figcaption.ck-editor__editable {
	width: auto;
}
</style>
