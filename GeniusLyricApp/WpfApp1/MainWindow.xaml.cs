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
        private void SearchClick(object sender, RoutedEventArgs e)
        {
            String scriptOut;

            scriptOut = LyricSearch(SongTitleInput.Text, SongArtistInput.Text);
            DisplayText1.Text = scriptOut;
        }

        private String LyricSearch (String songTitle, String artistName)
        {
            
            String scriptOut;
            String SongTitle = songTitle;
            String ArtistName = artistName;

            //Set path and args for script execution
            String pyScriptPath = @"""C:\Users\r_liu\Desktop\Home Projects\Genius Lyric App\genius-lyric-app\GeniusLyricPythonScript\lyricsearch.py""";
            String pyScriptArgs = "";
            pyScriptArgs = " " + '\u0022' + SongTitle + '\u0022' + " " + '\u0022' + ArtistName + "\"";
            
            //Start the process for python script
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
                    return scriptOut;
                    
                }
            }

        }

        private String SpotifyGetCurrent ()
        {

        }
    }
}
