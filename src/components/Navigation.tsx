import { INavLinkGroup, INavLink, INavStyles, Nav, initializeIcons, Stack } from '@fluentui/react'
import { FC } from 'react'

const navLinkGroups: INavLinkGroup[] = [
    {
        links: [
            {
                name: 'Dashboard',
                url: '/',
                key: 'key1',
                iconProps: {
                    iconName: 'News',
                    style: {
                        root: {
                            fontSize: 20,
                            color: '#106ebe',
                        }
                    } as React.CSSProperties
                }
            },
            {
                name: 'Settings',
                url: '/',
                key: 'key2',
                iconProps: {
                    iconName: 'PlayerSettings',
                    style: {
                        root: {
                            fontSize: 20,
                            color: '#106ebe',
                        }
                    } as React.CSSProperties
                }
            },
            {
                name: 'Transfer',
                url: '/',
                key: 'key3',
                iconProps: {
                    iconName: 'SwitcherStartEnd',
                    style: {
                        root: {
                            fontSize: 20,
                            color: '#106ebe',
                        }
                    } as React.CSSProperties
                }
            },
            {
                name: 'Stats',
                url: '/',
                key: 'key4',
                iconProps: {
                    iconName: 'StackedLineChart',
                    style: {
                        root: {
                            fontSize: 20,
                            color: '#106ebe',
                        }
                    } as React.CSSProperties
                }
            }
        ]
    }
]



const navigationStyle: Partial<INavStyles> = {
    root: {
        height: '100vh',
        boxSizing: 'border-box',
        border: '1px solid #eee',
        overflowY: 'auto',
    }
}

const Navigation: FC = () => {
    initializeIcons()
    return (
        <Nav
            groups={navLinkGroups}
            selectedKey='key1'
            styles={navigationStyle}
        />



    )
}

export default Navigation;