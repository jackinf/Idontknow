import * as React from 'react';
import {BloggingReducerState, BlogModel} from "./Blogging.models";
import {Table} from "antd";
import {PaginationProps} from "antd/lib/pagination";
import Button from "antd/lib/button/button";
import Modal from "antd/lib/modal/Modal";
import BlogCreate from "./BlogCreate";

class TestPersonTable extends Table<BlogModel> {}

interface BloggingComponentProps extends BloggingReducerState {
    submitBlogCreateForm: Function
}
interface BloggingComponentState {
    pagination: PaginationProps;
    loading: boolean;

    createInProgress: boolean;
    editInProgress: boolean;
    deleteInProgress: boolean;

    confirmLoading: boolean;
}

const columns = [
    {title: 'Title', dataIndex: 'title', key: 'title'},
    {title: 'Rating', dataIndex: 'rating', key: 'rating'}
];

class BloggingComponent extends React.Component<BloggingComponentProps, BloggingComponentState> {

    // TODO: to store
    state = {
        data: [],
        pagination: { total: 0, current: 0, pageSize: 25 },
        loading: false,

        createInProgress: false,
        editInProgress: false,
        deleteInProgress: false,

        confirmLoading: false
    };

    // TODO: To actions, I think...
    handleTableChange = (pagination: PaginationProps, filters: string[], sorter: { field: string, order: string }) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current || 0;
        this.setState({pagination: pager});
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    };

    // TODO: to actions and implement request
    fetch = (params = {}) => {
        console.log('params:', params);
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({
                loading: false,
                pagination: {total: 200, ...this.state.pagination},
            });
        }, 1000);
    };

    // TODO: to actions
    showCreateNewModal = () => {
        this.setState({createInProgress: true});
    };

    // TODO: to actions
    handleCreateNewConfirm = () => {
        this.setState({confirmLoading: true});
        this.props.submitBlogCreateForm(() => {
            this.setState({createInProgress: false, confirmLoading: false});
            this.fetch();
        });
    };

    // TODO: to actions
    handleCreateNewCancel = () => {
        console.log('Clicked cancel button');
        this.setState({createInProgress: false});
    };

    componentDidMount() {
        this.fetch();
    }

    render() {
        const { data } = this.props;
        const { pagination, loading, createInProgress, confirmLoading } = this.state;

        return (
            <div>
                <h2>Blogging</h2>

                <Button type="primary" onClick={this.showCreateNewModal}>Add new...</Button>

                <TestPersonTable
                    columns={columns}
                    rowKey={record => record.key}
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    onChange={this.handleTableChange}
                />

                <Modal title="Create new blog"
                       visible={createInProgress}
                       onOk={this.handleCreateNewConfirm}
                       confirmLoading={confirmLoading}
                       onCancel={this.handleCreateNewCancel}
                >
                    <BlogCreate />
                </Modal>

            </div>
        )
    }
}

export default BloggingComponent