import { makeAutoObservable } from 'mobx';
import { CMS_CATE_DETAIL_FIELD_KEY } from 'library/Constant/CmsConstant';
import PAGE_STATUS from 'constants/PageStatus';
import { notify } from 'components/Toast';
import history from 'routes/history';
class CategoriesDetailViewModel {
  categoriesStore = null;
  formStatus = PAGE_STATUS.READY;
  categoriesDetailViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
    data: [],
    dataDetail: [],
  };

  constructor(categoriesStore) {
    makeAutoObservable(this);
    this.categoriesStore = categoriesStore;
  }

  setForm = (categoriesDetailViewModel) => {
    this.categoriesDetailViewModel = categoriesDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.categoriesStore.getDetail(
      this.categoriesDetailViewModel.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.ID],
      this.callbackOnGetDetailSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.formStatus = PAGE_STATUS.READY;
  };

  handleCreate = async (redirect) => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.categoriesStore.saveData(
      this.categoriesDetailViewModel?.formPropsData,
      redirect ? redirect : null,
      this.callbackOnCreateSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handleUpdate = async (redirect) => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.categoriesStore.getDetail(
      this.categoriesDetailViewModel?.formPropsData,
      redirect ? redirect : null,
      this.callbackOnUpdateSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handleDelete = (id) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.categoriesStore.handleDelete(
      id,
      this.callbackOnDeleteSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handleDeleteMultiple = (arrId) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.categoriesStore.handleDeleteMultiple(
      arrId,
      this.callbackOnDeleteSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handleSearch = (value) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.categoriesStore.handleSearch(
      value,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  setFeatured = async (id, featured = 0) => {
    await this.categoriesStore.updateFeatured(
      { id: id.toString(), featured: featured.toString() },
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.successResponse.state = true;
  };

  handleEdit = async (value) => {
    this.formStatus = PAGE_STATUS.LOADING;
    history.push(`/categories-edit/${value?.id}`);
    await this.categoriesStore.handleEdit(
      value,
      this.callbackOnUpdateSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (result) => {
    if (result) {
      notify('Successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnDeleteSuccessHandler = (id) => {
    if (id) {
      notify('Delete successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnCreateSuccessHandler = (result) => {
    console.log('datadatadatadata', result);
    if (result) {
      notify('Create successfully', 'success');
      this.successResponse.data = result;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnErrorHandler = (error) => {
    notify('Unsuccessfully', 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnGetDetailSuccessHandler = (result) => {
    if (result) {
      console.log('result api', result);
      this.categoriesDetailViewModel.formPropsData = result;
      notify('GetDetail successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnUpdateSuccessHandler = (result) => {
    if (result) {
      console.log('result', result);
      notify('Update successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };
}

export default CategoriesDetailViewModel;
