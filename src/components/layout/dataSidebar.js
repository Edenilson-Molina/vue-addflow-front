export default [
    {
        title: 'Inicio',
        items: [
            {
                name:'Dashboard',
                icon: 'home',
                routeName: 'home'
            },
            {
                name: 'Configuraciones',
                icon: 'settings',
                parentName: 'settings',
                children: [
                    {
                        name: 'Personalizar etiquetas',
                        icon: 'label',
                        routeName: 'custom_labels'
                    },
                    {
                        name: 'Clasificaciones',
                        icon: 'category',
                        routeName: 'classifications'
                    }
                ]
            },
            // {
            //     name:'Roles y Permisos',
            //     icon: 'security',
            //     parentName: 'roles_permisos',
            //     children: [
            //         {
            //             name:'Roles',
            //             icon: 'verified_user',
            //             routeName: 'dashboard'
            //         },
            //         {
            //             name:'Permisos',
            //             icon: 'lock_open',
            //             routeName: 'dashboard'
            //         }
            //     ]
            // }
        ]
    },
]