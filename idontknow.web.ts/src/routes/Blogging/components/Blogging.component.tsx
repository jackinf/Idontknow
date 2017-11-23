import * as React from 'react';
import {BloggingReducerState, BlogModel} from "../Blogging.models";
import {Table} from "antd";
import {PaginationProps} from "antd/lib/pagination";
import Button from "antd/lib/button/button";
import Modal from "antd/lib/modal/Modal";
import BlogCreate from "./Create";
import BlogEdit from "./Edit";

class TestPersonTable extends Table<BlogModel> {}

interface BloggingComponentProps extends BloggingReducerState {
    fetchAsync: Function;
    createCancel: Function;
    createStart: Function;
    createSubmit: Function;
    editCancel: Function;
    editStart: Function;
    editSubmit: Function;
    deleteCancel: Function;
    deleteStart: Function;
    deleteSubmit: Function;
}
interface BloggingComponentState {
    pagination: PaginationProps;
}

const columns = [
    {title: 'Title', dataIndex: 'title', key: 'title'},
    {title: 'Rating', dataIndex: 'rating', key: 'rating'}
];

class BloggingComponent extends React.Component<BloggingComponentProps, BloggingComponentState> {

    // TODO: To actions, I think...
    handleTableChange = (pagination: PaginationProps, filters: string[], sorter: { field: string, order: string }) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current || 0;
        this.setState({pagination: pager});
        this.props.fetchAsync({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    };

    showCreateNewModal = () => { this.props.createStart(); };
    handleCreateNewConfirm = () => { this.props.createSubmit(() => this.props.fetchAsync()); };
    handleCreateNewCancel = () => { this.props.createCancel(); };

    showEditModal = (id: number) => { this.props.editStart(); };
    handleEditConfirm = () => { this.props.editSubmit(() => this.props.fetchAsync()); };
    handleEditCancel = () => { this.props.editCancel(); };

    componentDidMount() {
        this.props.fetchAsync();
    }

    render() {
        const { data, pagination, loading, createInProgress, editInProgress, confirmLoading } = this.props;

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

                <Modal title="Edit new blog"
                       visible={editInProgress}
                       onOk={this.handleEditConfirm}
                       confirmLoading={confirmLoading}
                       onCancel={this.handleEditCancel}
                >
                    <BlogEdit />
                </Modal>

            </div>
        )
    }
}

export default BloggingComponent