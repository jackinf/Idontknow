import * as React from 'react';
import {BloggingReducerState} from "./Blogging.reducer";
import {Table} from "antd";

interface BloggingComponentProps extends BloggingReducerState {}

class BloggingComponent extends React.Component<BloggingComponentProps> {
    render() {
        const { dataSource } = this.props;
        const columns = [
            {title: 'Title', dataIndex: 'title', key: 'title'},
            {title: 'Rating', dataIndex: 'rating', key: 'rating'}
        ];

        return (
            <div>
                <h2>Blogging</h2>

                <Table dataSource={dataSource} columns={columns} />
            </div>
        )
    }
}

export default BloggingComponent