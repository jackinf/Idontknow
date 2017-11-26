import * as React from 'react';
import { DemoTableReducerState } from './DemoTable.models';
import { Table } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import axios, { AxiosResponse } from 'axios';
import { RandomUserMeResponse, TestPersonModel } from './DemoTable.models';

class TestPersonTable extends Table<TestPersonModel> {}

interface DemoTableComponentProps extends DemoTableReducerState {}
interface DemoTableComponentState {
    data: TestPersonModel[];
    pagination: PaginationProps;
    loading: boolean;
}

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: (name: {first: string, last: string}) => `${name.first} ${name.last}`,
    width: '20%',
}, {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
    ],
    width: '20%',
}, {
    title: 'Email',
    dataIndex: 'email',
}];

class BloggingComponent extends React.Component<DemoTableComponentProps, DemoTableComponentState> {

    state = {
        data: [],
        pagination: { total: 0, current: 0 },
        loading: false
    };

    handleTableChange = (pagination: PaginationProps, filters: string[], sorter: { field: string, order: string }) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current || 0;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }

    fetch = (params = {}) => {
        console.log('params:', params);
        this.setState({ loading: true });
        axios.get<RandomUserMeResponse>('https://randomuser.me/api', {
            method: 'get',
            params: {
                results: 10,
                ...params,
            },
            responseType: 'json',
        }).then((value: AxiosResponse<RandomUserMeResponse>) => {
            const pagination = { ...this.state.pagination };
            // Read total count from server
            // pagination.total = data.totalCount;
            pagination.total = 200;
            this.setState({
                loading: false,
                data: value.data.results,
                pagination,
            });
        });
    }

    componentDidMount() {
        this.fetch();
    }

    render() {
        // const { dataSource } = this.props;
        const { data, pagination, loading } = this.state;

        return (
            <div>
                <h2>Demo table</h2>

                <TestPersonTable
                    columns={columns}
                    rowKey={record => record.registered}
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    onChange={this.handleTableChange}
                />

            </div>
        );
    }
}

export default BloggingComponent;