# use py 3.6.6

import glob
import wget

def read_first_line(file):
    """Gets the first line from a file.

    Returns
    -------
    str
        the first line text of the input file
    """
    with open(file, 'rt') as fd:
        first_line = fd.readline()
    
    f = open(file, 'r') # 開啟並讀取檔案
    lines = f.readlines() # 讀取檔案內容的每一行文字為陣列

    counter_wget=1
    sub_counter=0
    wget_file_name=""
    for line in lines:
        print(line, end = '') # 印出時結尾不印new line
        if counter_wget<3:
            print('~~~')
        elif counter_wget==3:
            wget_file_name=line.rstrip()
        else:
            if counter_wget%2==1:
                if line.find('png')==-1:
                    wget.download(line,out=wget_file_name+str(sub_counter)+".jpeg")
                else:
                    wget.download(line,out=wget_file_name+str(sub_counter)+".png")
                sub_counter=sub_counter+1
            else:
                print('~~~***')
        counter_wget=counter_wget+1
    f.close() # 關閉檔案
        
    return first_line



def merge_per_folder(folder_path, output_filename):
    """Merges first lines of text files in one folder, and
    writes combined lines into new output file

    Parameters
    ----------
    folder_path : str
        String representation of the folder path containing the text files.
    output_filename : str
        Name of the output file the merged lines will be written to.
    """
    # make sure there's a slash to the folder path 
    folder_path += "" if folder_path[-1] == "/" else "/"
    # get all text files
    txt_files = glob.glob(folder_path + "*.txt")
    # get first lines; map to each text file (sorted)
    output_strings = map(read_first_line, sorted(txt_files))
    output_content = "".join(output_strings)
    # write to file
    with open(folder_path + output_filename, 'wt') as outfile:
        outfile.write(output_content)

merge_per_folder('C:\\Users\\toshiba1000\\Desktop\\test125', 'finish.txt')
