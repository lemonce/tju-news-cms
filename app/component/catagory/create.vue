<template>
    <div>
		<el-container>
			<el-header>
				<h1>Create Catagory</h1>
			</el-header>
			<el-main>
				<el-form
					class="col-md-6"
					ref="catagory"
					:model="catagory"
					:rules="formRules"
					label-width="100px"
					label-position="left"
					size="medium"
					@submit.native.prevent="createCatagory('catagory')">
					<el-form-item label="name" prop="name">
						<el-input v-model="catagory.name"></el-input>
					</el-form-item>
					<el-form-item label="active">
						<el-switch v-model="catagory.active"></el-switch>
					</el-form-item>
					<el-form-item label="description" prop="description">
						<el-input type="textarea" v-model="catagory.description"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" native-type="submit">Create</el-button>
						<el-button @click="resetForm('catagory')">Cancel</el-button>
					</el-form-item>
				</el-form>
			</el-main>
		</el-container>
    </div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'createCatagory',
	data() {
		return {
			catagory: {
				name: '',
				active: true,
				description: ''
			},
			formRules: {
				name: [
					{
						required: true,
						message: 'Please input Catagory name',
					},
					{
						min: 2,
						message: 'Length is at least 2',
					}
				],
				description: [
					{
						required: true,
						message: 'Please input Catagory description',
					},
					{
						min: 3,
						message: 'Length is at least 3',
					}
				]
			}
		}
	},
	mounted() {

	},
	methods: {
		resetForm(formName) {
        	this.$refs[formName].resetFields();
		},
		createCatagory(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					axios.post('/api/tju/service/catagory', this.catagory).then(res => {
						this.resetForm(formName);
						
						this.$notify({
							title: 'Success',
							message: 'You have created a catagory',
							type: 'success',
							duration: 2000,
							position: 'top-left'
						});
					}).catch(err => {

						this.$notify.error({
							title: 'Fail',
							message: 'The creation process failed',
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
</script>