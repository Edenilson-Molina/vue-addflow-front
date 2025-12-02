export default [
    {
        title: 'Inicio',
        items: [
            {
                name:'Dashboard',
                icon: 'home',
                routeName: 'dashboard'
            },
            {
                name:'Roles y Permisos',
                icon: 'security',
                parentName: 'roles_permisos',
                children: [
                    {
                        name:'Roles',
                        icon: 'verified_user',
                        routeName: 'dashboard'
                    },
                    {
                        name:'Permisos',
                        icon: 'lock_open',
                        routeName: 'dashboard'
                    }
                ]
            }
        ]
    },
    {
        title: 'Reportes',
        items: [
            {
                name:'Flujo de Caja',
                icon: 'assessment',
                routeName: 'dashboard'
            },
            {
                name:'Ventas',
                icon: 'bar_chart',
                parentName: 'ventas',
                children: [
                    {
                        name:'Por Producto',
                        icon: 'shopping_cart',
                        routeName: 'home'
                    },
                    {
                        name:'Por Cliente',
                        icon: 'people',
                        routeName: 'dashboard'
                    }
                ]
            }
        ]
    },
    {
        title: 'Estadísticas',
        items: [
            {
                name:'Benchmarks',
                icon: 'assessment',
                routeName: 'dashboard'
            },
            {
                name:'Beneficios',
                icon: 'bar_chart',
                parentName: 'beneficios',
                children: [
                    {
                        name:'Por Producto',
                        icon: 'shopping_cart',
                        routeName: 'home'
                    },
                    {
                        name:'Por Cliente',
                        icon: 'people',
                        routeName: 'dashboard'
                    }
                ]
            }
        ]
    },
    {
        title: 'Configuración',
        items: [
            {
                name:'Usuarios',
                icon: 'person',
                routeName: 'dashboard'
            },
            {
                name:'Ajustes',
                icon: 'settings',
                routeName: 'dashboard'
            }
        ]
    },
    {
        title: 'Soporte',
        items: [
            {
                name:'Ayuda',
                icon: 'help',
                routeName: 'dashboard'
            },
            {
                name:'Contacto',
                icon: 'contact_mail',
                routeName: 'dashboard'
            },
            {
                name:'FAQ',
                icon: 'live_help',
                routeName: 'dashboard'
            },
            {
                name:'Términos y Condiciones',
                icon: 'gavel',
                routeName: 'dashboard'
            }
        ]
    }
]