import "./App.less"
import * as React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import { 
    AppBar, 
    RaisedButton, 
    Paper,
    Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle,
    TextField,
    DatePicker,
    List, ListItem, makeSelectable,
    Subheader,
    FontIcon,
    Table,
    TableHeader, TableHeaderColumn,
    TableBody,
    TableRow, TableRowColumn,
    IconMenu, IconButton, MenuItem, Divider
} from "material-ui";
import { AlertError, AlertWarning, ActionInfo } from "material-ui/svg-icons";
import { red500, lightBlue500, orange500 } from "material-ui/styles/colors";

const dock = (top = 0, right = 0, bottom = top, left = right) => ({
    position: 'absolute',
    top, right, bottom, left
});

const SelectableList = makeSelectable(List);

export class App extends React.Component<any, any> {
    state = {
        currentSearch: "",
        currentClock: 10,
    }
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div style={{ background: '#f7f7f7', ...dock() }}>
                    <AppBar 
                        title="控制台日志" 
                        style={{'-webkit-user-select': 'none'}}
                        titleStyle={{ cursor: 'default' }}
                        iconElementLeft={
                            <IconMenu
                                iconButtonElement={
                                    <IconButton><FontIcon color="white" className="material-icons">menu</FontIcon></IconButton>
                                }
                            >
                                <MenuItem>登录跳板机</MenuItem>
                                <Divider></Divider>
                                <MenuItem>关于</MenuItem>
                            </IconMenu>
                        }>
                    </AppBar>
                    <Toolbar style={{
                        paddingBottom: 10
                    }}>
                        <ToolbarGroup>
                            <DatePicker
                                floatingLabelText="查询日期" 
                                container="inline"
                                style={{ width: 100 }}
                            />
                            <TextField
                                value={this.state.currentSearch}
                                floatingLabelText={this.state.currentSearch ?
                                    "使用 + 来增加条件，使用 - 来排除条件" :
                                    "查询条件"
                                }
                                onChange={(e, value) => {
                                    this.setState({ currentSearch: value });
                                }}
                                floatingLabelStyle={{ whiteSpace: 'nowrap' }}
                            />
                        </ToolbarGroup>
                    </Toolbar>
                    <Paper style={{display: "flex", margin: 10, ...dock(120, 0, 0) }}>
                        <SelectableList 
                            value={this.state.currentClock} 
                            onChange={(e, newClock) => this.setState({ currentClock: newClock })} 
                            style={{
                                ...dock(),
                                right: 'auto',
                                width: 150,
                                overflowY: 'scroll',
                                '-webkit-user-select': 'none'
                            }
                        }>
                            {(() => { 
                                const clock = [] as number[]; 
                                for(let i = 0; i < 24; i++) {
                                    clock.push(i);
                                }
                                return clock;
                            })().map(clock => (
                                <ListItem key={clock} value={clock}>{clock}点</ListItem>
                            ))}
                        </SelectableList>
                        <Table wrapperStyle={{...dock(0, 0, 0, 150)}} selectable={false} multiSelectable={false}>
                            <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn style={{ width: 60 }}>类型/时间</TableHeaderColumn>
                                    <TableHeaderColumn>内容</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                { "a".repeat(100).split('').map((x, i) => 
                                <TableRow style={{ height: 'auto' }} key={i}>
                                    <TableRowColumn style={{ width: 60, height: 'auto' }}>
                                        {(() => {
                                            switch(Math.floor(Math.random() * 100) % 10) {
                                                case 0: return <FontIcon color={red500} style={{ fontSize: 13, verticalAlign: 'middle', marginRight: 5 }} className="material-icons">error</FontIcon>
                                                case 1: 
                                                case 2:
                                                case 3:
                                                    return <FontIcon color={orange500} style={{ fontSize: 13, verticalAlign: 'middle', marginRight: 5 }} className="material-icons">warning</FontIcon>
                                                default: return <FontIcon color={lightBlue500} style={{ fontSize: 13, verticalAlign: 'middle', marginRight: 5 }} className="material-icons">info</FontIcon>
                                            }
                                        })()}
                                        11:30
                                    </TableRowColumn>
                                    <TableRowColumn style={{ height: 30 }}>[./ui/ts/components/App.tsx] ./ui/ts/components/App.tsx 4.21 kB {0} [built]</TableRowColumn>
                                </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}