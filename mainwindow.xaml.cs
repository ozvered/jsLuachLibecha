using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace WpfApplication1
{
    /// <summary>
    /// Interaction logic for StartWin.xaml
    /// </summary>
    public partial class StartWin : Window
    {
        public StartWin()
        {
            InitializeComponent();
            var bc = new BrushConverter();
            //myTextBox.Text = Calander.calender("-h5774");
            string argv = "-h5775";
            int hFlag = (argv.IndexOf("-h") > -1) ? 1 : 0;
            
            win1.FlowDirection = (FlowDirection)hFlag;
            H_G_year myYear = H_G_year.CREATEyear1(argv);
            int i=0;
            win1.Title = myYear.hName+"/"+myYear.gName;
                
            foreach (Month m in ((MonthCollection)myYear.mcArr[0]).mArr)
            if(m.daysArr.Count>0)
            {
                //continue;    
                RowDefinition rd = new RowDefinition();
                WrapPanel wp = new WrapPanel();
                G1.RowDefinitions.Add(rd);
                wp.Name = "w" + i.ToString();
                foreach (Day d in m.daysArr)
                {
                    Button bt = new Button();
                    if (d.GetType().ToString()=="WpfApplication1.sDay")
                    {
                        bt.BorderBrush = Brushes.Red;
                        bt.ToolTip = ((sDay)d).wParasha;
                    }
                    else if (d.GetType().ToString()=="WpfApplication1.moedDay")
                    {
                        bt.BorderBrush = Brushes.DarkOrange;
                    }
                    else if (d.spTitle!=null)
                    {
                        bt.BorderBrush = Brushes.DarkGreen;
                    }
                    StackPanel sp = new StackPanel();
                    TextBlock tbH = new TextBlock();
                    tbH.Text = d.hDate;
                    sp.Children.Add(tbH);
                    TextBlock tbWD = new TextBlock();
                    tbWD.Text = d.wdDate;
                    sp.Children.Add(tbWD);
                    TextBlock tbG = new TextBlock();
                    tbG.Text = d.gDate;
                    sp.Children.Add(tbG);

                    if (d.spTitle != null) bt.ToolTip = ((bt.ToolTip!=null)?bt.ToolTip+" ":"")+ d.spTitle;
                    if (d.GetType().ToString() == "WpfApplication1.moedDay"||d.GetType().ToString()=="WpfApplication1.sDay")
                    {
                        bt.ToolTip =(hFlag==1? (bt.ToolTip + " זמן כניסה-" + ((moedDay)d).kTime + " זמן יציאה-" + ((moedDay)d).yTime):
                             (bt.ToolTip + " Enter time-" + ((moedDay)d).kTime + " Exit time-" + ((moedDay)d).yTime));
                    }
                    bt.Content = sp;
                    bt.MinWidth = 20;
                    wp.Children.Add(bt);
                }
                StackPanel spT = new StackPanel();
                TextBlock tbH1 = new TextBlock();
                tbH1.Text =(hFlag==1? m.hName:m.eName);
                spT.Children.Add(tbH1);
                string gTitle=((hMonth)m).gName;
                if (gTitle.IndexOf("-") > 0)
                {
                    TextBlock tbG1 = new TextBlock();
                    tbG1.Text = gTitle.Split('-')[0];
                    spT.Children.Add(tbG1);
                    TextBlock tbG2 = new TextBlock();
                    tbG2.Text = "-"+gTitle.Split('-')[1];
                    spT.Children.Add(tbG2);
                }
                else 
                {
                    TextBlock tbG1 = new TextBlock();
                    tbG1.Text = gTitle;
                    spT.Children.Add(tbG1);
                }
                

                spT.SetValue(Grid.RowProperty, i);
                spT.SetValue(Grid.ColumnProperty, 0);
                G1.Children.Add(spT);
                

                if (i % 2 == 0) wp.Background = spT.Background = (Brush)bc.ConvertFrom("#FFFFEBCD");//Brushes.BlanchedAlmond ;
                wp.SetValue(Grid.RowProperty, i);
                wp.SetValue(Grid.ColumnProperty, 1);
                G1.Children.Add(wp);
                i++;
            }
        }
    }
}
