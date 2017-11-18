import * as React from 'react';

export interface BloggingComponentProps {
    initialValue?: number;
}

interface DefaultProps {
    initialValue: number;
}

type PropsWithDefaults = BloggingComponentProps & DefaultProps;

const BloggingComponent: React.ComponentClass<BloggingComponentProps> =
    class extends React.Component<PropsWithDefaults> {
        static defaultProps: DefaultProps = {
            initialValue: 0
        };

        demo = () => {
            console.log("demo");
        };

        render() {
            const {demo} = this;
            const {initialValue} = this.props;

            return (
                <div>
                    {initialValue}
                    <button type="button" onClick={demo}>
                        Demo
                    </button>
                </div>
            );
        }
    };

export default BloggingComponent;