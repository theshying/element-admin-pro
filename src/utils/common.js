
// 文件下载方法通用
export const fileDownload = (url, options = {method: 'GET', data: null}) => {
    return new Promise((res, rej) => {
        axiosInstance({
            url,
            headers: {
                'Cache-Control': 'no-cache'
            },
            method: options.method || 'GET',
            responseType: 'blob', // important
            ignorShowLoading: true,
            isFileDownload: true,
            data: options.data || null
        }).then((response) => {
            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'];
            const resMessage = decodeURIComponent(response.headers['x-custom-message'] || response.headers['X-Custom-Message'] || '');

            if (contentDisposition) {
                // 下载文件
                const filename = decodeURIComponent((contentDisposition.match(/filename=\"([\s\S]*)\"/) || [])[1]);

                const blobModel = new Blob([response.data]);

                if (!window.navigator.msSaveOrOpenBlob) {
                    // 非IE浏览器
                    const url = window.URL.createObjectURL(blobModel);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();
                    setTimeout(() => {
                        document.body.removeChild(link);
                    }, 0);
                } else {
                    // IE 11
                    window.navigator.msSaveOrOpenBlob(blobModel, filename);
                }

                res(filename);
            } else if (resMessage) {
                // 提示错误信息
                rej(new Error(resMessage));
            } else {
                rej(new Error(localI18n.t('common.server-error')));
            }
        }).catch((error) => {
            rej(error);
        });
    });
};

// pdf文件预览通用方法，参数必须为pdf文件的绝对路径
export const previewPdf = (url) => {
    let i18nValue = store.state.i18nValue;

    if (i18nValue === 'en') {
        i18nValue = 'en-US';
    }
    const noCacheUrl = url + '&_t=' + Date.now();

    const pdfViewerUrl = `dist/static/pdfjs/web/viewer.html?file=${encodeURIComponent(noCacheUrl)}#locale=${i18nValue}`;

    // 为了防止浏览器阻止弹出新窗口，使用创建a元素点击的方式实现
    const link = document.createElement('a');
    link.href = pdfViewerUrl;
    link.style.visibility = 'hidden';
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
        document.body.removeChild(link);
    }, 0);
};

export const previewOffice = (fileId) => {
    return new Promise((res, rej) => {
        axiosInstance({
            url: `/web/v1/preview/${fileId}`,
            method: 'GET',
            ignorShowLoading: true,
            isFileDownload: true
        }).then((response) => {
            if (response.data.succeed) {
                const previewUrl = response.data.data;

                const link = document.createElement('a');
                link.href = previewUrl;
                link.style.visibility = 'hidden';
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
                document.body.appendChild(link);
                link.click();
                setTimeout(() => {
                    document.body.removeChild(link);
                }, 0);
                res();
            } else {
                rej(new Error(response.data.msg));
            }
        }).catch((error) => {
            rej(error);
        });
    });
};
