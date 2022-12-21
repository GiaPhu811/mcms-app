import { Component } from 'react';
import axios from 'axios';
import { CategoryModel } from './CMSCategoriesModel';
import CmsCategoriesRoute from './CMSCategoriesRoute';

class AesirxCmsCategoryApiService extends Component {
  route = null;

  constructor(props) {
    super(props);
    this.route = new CmsCategoriesRoute();
  }
  getList = async () => {
    try {
      const data = await this.route.getList();
      let results = null;
      if (data) {
        results = new CategoryModel(data);
      }
      return results;
    } catch (error) {
      if (axios.isCancel(error)) {
        return { message: 'isCancel' };
      } else throw error;
    }
  };

  create = async (data) => {
    try {
      const result = await this.route.create(data);
      console.log('resultresult', result);
      if (result) {
        return result.result;
      }
      return { message: 'Something have problem' };
    } catch (error) {
      if (axios.isCancel(error)) {
        return { message: 'isCancel' };
      } else throw error;
    }
  };

  update = async (data) => {
    try {
      const result = await this.route.update(data);
      if (result) {
        return result.result;
      }
      return { message: 'Something have problem' };
    } catch (error) {
      if (axios.isCancel(error)) {
        return { message: 'isCancel' };
      } else throw error;
    }
  };

  delete = async (id) => {
    try {
      const result = await this.route.delete(id);
      if (result) {
        return result.result;
      }
      return { message: 'Something have problem' };
    } catch (error) {
      if (axios.isCancel(error)) {
        return { message: 'isCancel' };
      } else throw error;
    }
  };

  getDetail = async (id = 0) => {
    try {
      const data = await this.route.getDetail(id);
      let results = null;
      if (data) {
        results = new CategoryModel(data);
      }
      if (results) {
        results = results.toJSON();
      }

      return results;
    } catch (error) {
      if (axios.isCancel(error)) {
        return { message: 'isCancel' };
      } else throw error;
    }
  };
}

export default AesirxCmsCategoryApiService;
