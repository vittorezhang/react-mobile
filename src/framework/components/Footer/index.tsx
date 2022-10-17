import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
    return (
        <DefaultFooter
            copyright={`2021 Poweredby Jacky`}
            links={[
                {
                    key: 'github',
                    title: <GithubOutlined />,
                    href: 'https://gitee.com/ape-stack/chaos',
                    blankTarget: true,
                },
            ]}
        />
    );
};
