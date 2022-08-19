package com.monitoringresources.app.Object;

public class Debug 
{
    private String URL;
    private String beging;
    private String continues;
    private String stop;
    private int[] breakPointLines;

    public Debug(){}

    /**
     * Debug
     * 
     * @param url
     * @param startLine
     * @param endLine
     */
    public Debug( String url, String beging, String continues, String stop, int[] breakPointLines ) 
    {
        URL = url;
        this.beging = beging;
        this.continues = continues;
        this.stop = stop;
        this.breakPointLines = breakPointLines;
    }

    public int[] getBreakPointLines() 
    {
        return breakPointLines;
    }

    public void setBreakPointLines( int[] breakPointLines ) 
    {
        this.breakPointLines = breakPointLines;
    }

    /**
     * getURL
     * 
     * @return String
     */
    public String getURL() 
    {
        return URL;
    }

    /**
     * setURL
     * 
     * @param url String
     */
    public void setURL( String url ) 
    {
        URL = url;
    }

    public String getBeging() 
    {
        return beging;
    }

    public void setBeging( String beging ) 
    {
        this.beging = beging;
    }

    public String getContinues() 
    {
        return continues;
    }

    public void setContinues( String continues ) 
    {
        this.continues = continues;
    }

    public String getStop() 
    {
        return stop;
    }

    public void setStop( String stop ) 
    {
        this.stop = stop;
    }
}
