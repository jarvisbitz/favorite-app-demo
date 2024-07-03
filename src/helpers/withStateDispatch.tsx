import {ComponentType} from 'react';
import {connect, ConnectedComponent} from 'react-redux';
import {addFavorite, getList, getLogin, removeFavorite} from '../api/actions';

const mapStateToProps = (state: any) => ({
  Loading: state.common.loading,
  Auth: state.auth,
  Favorite: state.favorite.favorites,
});

const mapDispatchToProps = (dispatch: any) => ({
  Login: (data: any, resolve: any, reject: any) =>
    dispatch(getLogin(data, resolve, reject)),
  List: (data: any, resolve: any, reject: any) =>
    dispatch(getList(data, resolve, reject)),
  AddFavorite: (data: any, resolve: any, reject: any) =>
    dispatch(addFavorite(data, resolve, reject)),
  RemoveFavorite: (data: any, resolve: any, reject: any) =>
    dispatch(removeFavorite(data, resolve, reject)),
});

export const withStateDispatch = (WrappedComponent: ComponentType<any>) =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(WrappedComponent) as ConnectedComponent<typeof WrappedComponent, any>;
