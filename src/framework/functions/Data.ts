import request from './Request';
import { message, Modal } from 'antd';
const { confirm } = Modal;
// import { ExclamationCircleOutlined } from '@ant-design/icons';

export async function add(host: string, domain: string, param: any = {}) {
    // message.loading('正在添加');
    message.loading({
        content: '正在添加',
        key: 'add',
    });
    const { data } = await request(`/${host}/api/${domain}/add`, {
        data: param,
    });
    if (data) {
        // message.success('添加成功');
        message.success({
            content: '添加成功',
            key: 'add',
        });
    }
    return data || false;
}

export async function update(
    host: string,
    domain: string,
    id: string,
    param: any = {},
    other?: string,
) {
    // message.loading('正在更新');
    message.loading({
        content: '正在更新',
        key: 'update',
    });
    if (other) {
        if (other === 'other') {
            const { data } = await request(`/${host}/api/${domain}/update`, {
                data: { data: { id, ...param } },
            });
            if (data) {
                // message.success('更新成功');
                message.success({
                    content: '更新成功',
                    key: 'update',
                });
            }
            return data || false;
        }
        const { data } = await request(
            `/${host}/api/${domain}/update/${other}`,
            {
                data: { data: { id, ...param } },
            },
        );
        if (data) {
            // message.success('更新成功');
            message.success({
                content: '更新成功',
                key: 'update',
            });
        }
        return data || false;
    }
    const { data } = await request(`/${host}/api/${domain}/update`, {
        data: { id, data: param },
    });
    if (data) {
        // message.success('更新成功');
        message.success({
            content: '更新成功',
            key: 'update',
        });
    }
    return data || false;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function remove(
    host: string,
    domain: string,
    id: string | {} | [],
    obj?: string,
) {
    return new Promise((resolve) => {
        confirm({
            title: '提示',
            content: '确定删除吗?',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            async onOk() {
                message.loading({
                    content: '正在删除',
                    key: 'delete',
                });
                if (obj) {
                    const { data } = await request(
                        `/${host}/api/${domain}/delete`,
                        { data: id },
                    );
                    if (data) {
                        // message.success('删除成功');
                        message.success({
                            content: '删除成功',
                            key: 'delete',
                        });
                    }
                    resolve(data || false);
                } else {
                    const { data } = await request(
                        `/${host}/api/${domain}/delete`,
                        { data: { id } },
                    );
                    if (data) {
                        // message.success('删除成功');
                        message.success({
                            content: '删除成功',
                            key: 'delete',
                        });
                    }
                    resolve(data || false);
                }
            },
        });
    });
}

export async function page(host: string, domain: string, params: any = {}) {
    const { current: pageNum, pageSize, data: param } = params;
    const res = await request(`/${host}/api/${domain}/page`, {
        data: { pageNum, pageSize, data: param },
    });
    const { list: data = [], total = 0 } = res.page || {};
    return { data, success: true, total };
}

export async function list(
    host: string,
    domain: string,
    param: any = {},
    other?: string,
) {
    if (other) {
        const { data } = await request(`/${host}/manage/${domain}/list`, {
            data: param,
        });
        return data || [];
    }
    const { data } = await request(`/${host}/api/${domain}/list`, {
        data: param,
    });
    return data || [];
}

export async function one(host: string, domain: string, id: string) {
    const { data } = await request(`/${host}/api/${domain}/one`, {
        data: { id },
    });
    return data || {};
}

export async function submit(rul: string, param: any = {}) {
    const { data } = await request(`/${rul}`, { data: param });
    return data || false;
}

export async function search(url: string, params: any = {}) {
    const { current: pageNum, pageSize, data: param } = params;
    const res = await request(`/${url}`, {
        data: { pageNum, pageSize, data: param },
    });
    const { list: data = [], total = 0 } = res.page || {};
    return { data, success: true, total };
}

export async function query(url: string, param: any = {}) {
    const { data } = await request(`/${url}`, { data: param });
    return data;
}
