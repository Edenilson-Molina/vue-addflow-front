export default [
    {
        path: '/maintenance/custom-labels',
        name: 'custom_labels',
        meta: {
            title: 'Custom Labels',
        },
        component: () => import('@/views/layers/admin/views/main_custom_labels/HomeCustomLabel.vue'),
    },
    {
        path: '/maintenance/classifications',
        name: 'classifications',
        meta: {
            title: 'Classifications',
        },
        component: () => import('@/views/layers/admin/views/main_config_category/HomeConfigCategory.vue'),
    }
];