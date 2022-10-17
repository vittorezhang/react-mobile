import React, { useEffect, useState } from 'react';

import styles from './index.less';
import { query } from '../../framework/functions/Data';

export default function IndexPage() {
    const domain = 'zyWechatConf';
    useEffect(() => {
        console.log('22222222222');

        query(`user/api/clientUser/updateUserInfo`, {});
    }, []);
    return (
        <div>
            <h1 className={styles.title}>Page index</h1>
        </div>
    );
}
