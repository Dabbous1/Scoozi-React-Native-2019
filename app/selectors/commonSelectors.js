import { createSelector } from 'reselect';

export const getOperations = (state) => state.operations;
export const getCurrentDetectedRide = (state) => state.currentDetectedRide;
export const makeGetOperation = () => {
    return createSelector(
        getOperations,
        (state, props) => props.operation_name,
        (operations, operation_name) => operations[operation_name]
    );
};

export const makeIsOperationLoading = () => {
    return createSelector(
        makeGetOperation(),
        (operation) => operation && operation.loading
    );
};

export const makeIsOperationLoadingMore = () => {
    return createSelector(
        makeGetOperation(),
        (operation) => operation && operation.loadingMore
    );
};

export const makeGetOperationError = () => {
    return createSelector(
        makeGetOperation(),
        (operation) => operation && operation.error
    );
};

export const makeGetOperationResult = () => {
    return createSelector(
        makeGetOperation(),
        (operation) => operation && operation.result
    );
};

export const makeGetOperationIds = () => {
    return createSelector(
        makeGetOperation(),
        (operation) => operation && operation.ids
    );
};

export const makeCanOperationLoadMore = () => {
    return createSelector(
        makeGetOperationResult(),
        makegetOperationCurrentPage(),
        (result, currentPage) => {
            if (currentPage === undefined) {
                return false;
            }
            return currentPage !== (result && result.last_page);
        }
    );
};

export const makegetOperationCurrentPage = () => {
    return createSelector(
        makeGetOperationResult(),
        (result) => result && result.current_page
    );
};

export const makeCanRequestMore = () => {
    return createSelector(
        makeIsOperationLoading(),
        makeIsOperationLoadingMore(),
        makeCanOperationLoadMore(),
        (isLoading, isLoadingMore, canLoadMore) => !isLoading && !isLoadingMore && canLoadMore
    );
};
