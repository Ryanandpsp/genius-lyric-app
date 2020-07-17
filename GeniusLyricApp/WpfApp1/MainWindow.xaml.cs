using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Diagnostics;
using System.IO;
namespace WpfApp1
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
        private void Search_Click(object sender, RoutedEventArgs e)
        {
            //String argument1 = InputText1.Text;
            String scriptOut;
            String pyScriptPath = @"""C:\Users\r_liu\Desktop\Home Projects\Genius Lyric App\genius-lyric-app\GeniusLyricPythonScript\lyricsearch.py""";
            String pyScriptArgs = "";

            String SongTitle = SongTitleInput.Text;
            String ArtistName = SongArtistInput.Text;
            pyScriptArgs = " "+ '\u0022' + SongTitle + '\u0022' + " " + '\u0022' +  ArtistName + "\"";

            ProcessStartInfo startInfo = new ProcessStartInfo();
            startInfo.FileName = @"python.exe";
            startInfo.Arguments = pyScriptPath + pyScriptArgs;
            startInfo.UseShellExecute = false;
            startInfo.CreateNoWindow = true;
            startInfo.RedirectStandardOutput = true;
            using (Process p = Process.Start(startInfo))
            {
                using (StreamReader s = p.StandardOutput)
                {
                    scriptOut = s.ReadToEnd();
                    DisplayText1.Text = scriptOut;
                }
            }
        }
    }
}
